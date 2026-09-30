#!/usr/bin/env python3
"""Trích dữ kiện + cắt ảnh trích dẫn từ PDF bản án — TẤT ĐỊNH, không AI, không đoán.

Gọi bởi scripts/02c-pdf-source.local.mjs. Không import module nào của pipeline.
Usage: pdf_extract.py --pdf-dir D --out-dir D --docs-dir D --docs-rel REL [--highlights F] [--script F]
Ghi <out-dir>/case-facts.json + <out-dir>/crosscheck.md (nếu có --script) + ảnh vào docs-dir.
"""
import argparse, hashlib, json, os, re, sys, glob

import pymupdf

TEXT_LAYER_MIN_CHARS = 80  # dưới ngưỡng này trên 1 trang = coi là ảnh scan, KHÔNG đoán nội dung
ORANGE = (1.0, 0.42, 0.0)
MARGIN = 36  # pt, lề trái/phải khi cắt full-width
OUT_WIDTH_PX = 1080

# Các mục tiêu cắt mặc định: (kind, regex trên TEXT MỘT DÒNG, dòng trước, dòng sau, tối đa)
DECISION_RE = re.compile(r"^QUYẾT\s+ĐỊNH\s*:?$")
TARGETS = [
    ("header", re.compile(r"B[ẢA]N\s+[ÁA]N", re.I), 1, 6, 1),
    ("verdict", re.compile(r"(tuyên\s+bố|xử\s+phạt|phạt\s+tù|không\s+chấp\s+nhận|giữ\s+nguyên|sửa\s+bản\s+án|hủy\s+bản\s+án)", re.I), 1, 5, 2),
    ("law", re.compile(r"(căn\s+cứ|áp\s+dụng).*Điều\s+\d+", re.I), 0, 4, 1),
]


def norm(s):
    return re.sub(r"\s+", " ", (s or "").replace("\u00ad", "-")).strip()  # U+00AD (soft hyphen) -> "-"


def slug(s):
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s[:40] or "pdf"


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def page_lines(page):
    """[(text, rect)] theo thứ tự đọc; dùng để cắt cửa sổ quanh dòng khớp."""
    out = []
    d = page.get_text("dict")
    for b in d["blocks"]:
        if b.get("type") != 0:
            continue
        for ln in b["lines"]:
            t = norm("".join(sp["text"] for sp in ln["spans"]))
            if t:
                out.append((t, pymupdf.Rect(ln["bbox"])))
    out.sort(key=lambda x: (round(x[1].y0, 1), x[1].x0))
    return out


# ---------- dữ kiện (regex tất định, mỗi cái kèm page + quote là substring của text trang) ----------
def _num(x):
    x = x.strip()
    if re.fullmatch(r"\d{1,3}(?:\.\d{3})+", x):  # 1.500 -> 1500 (dấu chấm nghìn)
        return float(x.replace(".", ""))
    return float(x.replace(",", "."))


def money_to_vnd(txt):
    t = txt.lower()
    m = re.match(r"([\d.,]+)\s*tỷ(?:\s*([\d.,]+)\s*triệu)?", t)
    if m:
        return int(_num(m.group(1)) * 1e9 + (_num(m.group(2)) * 1e6 if m.group(2) else 0))
    m = re.match(r"([\d.,]+)\s*triệu", t)
    if m:
        return int(_num(m.group(1)) * 1e6)
    m = re.match(r"(\d{1,3}(?:[.,]\d{3})+)", t)
    if m:
        return int(re.sub(r"[.,]", "", m.group(1)))
    return None


MONEY_RE = re.compile(r"\d{1,3}(?:[.,]\d{3})+\s*(?:đồng|VNĐ|VND|đ)\b|\d+(?:[.,]\d+)?\s*(?:triệu|tỷ)(?:\s*đồng)?", re.I)
FACT_PATTERNS = {
    "so_ban_an": re.compile(r"B[ảa]n\s+[áa]n\s+s[ốo]\s*:?\s*([\w/.\-]+)", re.I),
    "ngay": re.compile(r"ngày\s+\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4}|ngày:?\s*\d{1,2}[-/]\d{1,2}[-/]\d{4}", re.I),
    "toa_an": re.compile(r"TÒA ÁN NHÂN DÂN(?: \S+){0,10}"),  # cắt lại theo từ VIẾT HOA liên tiếp trong extract_facts
    "dieu_luat": re.compile(r"(?:điểm\s+[a-zđ]\s+)?(?:khoản\s+\d+\s+)?Điều\s+\d+", re.I),
    "hinh_phat": re.compile(r"(?:phạt\s+tù|tù\s+chung\s+thân|tử\s+hình)[^.;]{0,60}|\d+\s*(?:\([^)]{1,20}\)\s*)?(?:năm|tháng)(?:\s+\d+\s*(?:\([^)]{1,20}\)\s*)?tháng)?\s+tù", re.I),
    "so_tien": MONEY_RE,
}


def extract_facts(page_texts):
    facts = {k: [] for k in FACT_PATTERNS}
    seen = {k: set() for k in FACT_PATTERNS}
    for pno, text in page_texts:
        for k, rx in FACT_PATTERNS.items():
            for m in rx.finditer(text):
                val = norm(m.group(0))
                if k == "toa_an":
                    toks, keep = val.split(" "), []
                    for tk in toks:
                        if not tk.isupper():
                            break
                        keep.append(tk)
                    val = " ".join(keep)
                if val in seen[k]:
                    continue
                seen[k].add(val)
                a, b = max(0, m.start() - 40), min(len(text), m.end() + 40)
                item = {"value": val, "page": pno, "quote": text[a:b].strip()}
                if k == "so_tien":
                    item["vnd"] = money_to_vnd(val)
                facts[k].append(item)
    return facts


# ---------- cắt ảnh trích dẫn ----------
def render_crop(doc, page, focus_rects, pad_top, pad_bottom, out_path, highlight_rects):
    """Cắt full-width lề-đến-lề, cao vừa đủ quanh focus_rects; tô cam highlight_rects bằng annotation."""
    pr = page.rect
    y0 = max(pr.y0, min(r.y0 for r in focus_rects) - pad_top)
    y1 = min(pr.y1, max(r.y1 for r in focus_rects) + pad_bottom)
    # Bám ranh giới dòng: chỉ giữ NGUYÊN các dòng có tâm nằm trong [y0, y1] (đệm dư từng cắt đôi dòng
    # liền kề — vision QA thấy "dòng đầu bị cắt mép trên"). Trang scan (không có dòng) giữ nguyên.
    inside = [r for _, r in page_lines(page) if y0 <= (r.y0 + r.y1) / 2 <= y1]
    if inside:
        y0 = max(pr.y0, min(r.y0 for r in inside) - 1)
        y1 = min(pr.y1, max(r.y1 for r in inside) + 1)
    clip = pymupdf.Rect(pr.x0 + MARGIN, y0, pr.x1 - MARGIN, y1)
    annots = []
    for r in highlight_rects:
        a = page.add_highlight_annot(r)
        a.set_colors(stroke=ORANGE)
        a.update()
        annots.append(a)
    try:
        zoom = OUT_WIDTH_PX / clip.width
        pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), clip=clip, annots=True, alpha=False)
        pix.save(out_path)
    finally:
        for a in annots:
            page.delete_annot(a)
    return clip, pix.width, pix.height


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pdf-dir", required=True)
    ap.add_argument("--out-dir", required=True)
    ap.add_argument("--docs-dir", required=True)
    ap.add_argument("--docs-rel", required=True, help="tiền tố đường dẫn tương đối repo cho field file")
    ap.add_argument("--highlights")
    ap.add_argument("--script")
    args = ap.parse_args()

    pdfs = sorted(glob.glob(os.path.join(args.pdf_dir, "*.pdf")))
    if not pdfs:
        print(json.dumps({"ok": False, "error": "no-pdf"}))
        return 2
    os.makedirs(args.out_dir, exist_ok=True)
    os.makedirs(args.docs_dir, exist_ok=True)
    # Idempotent: dọn output cũ của CHÍNH script này (chỉ doc-*.png + pages/), không đụng file khác.
    for old in glob.glob(os.path.join(args.docs_dir, "doc-*.png")):
        os.remove(old)
    pages_dir = os.path.join(args.out_dir, "pages")
    os.makedirs(pages_dir, exist_ok=True)
    for old in glob.glob(os.path.join(pages_dir, "*.png")):
        os.remove(old)

    highlights = []
    if args.highlights and os.path.exists(args.highlights):
        with open(args.highlights, encoding="utf-8") as f:
            highlights = [norm(l) for l in f if norm(l) and not l.lstrip().startswith("#")]

    summary_pdfs, all_text_pages, assets, not_found = [], [], [], []
    counter = 0

    def add_asset(kind, pdf_name, page_no, bbox, quote, verified, path_png, w, h, hl_text=None):
        nonlocal counter
        counter += 1
        aid = f"doc-{counter:02d}"
        final = os.path.join(args.docs_dir, f"{aid}-{kind}.png")
        os.replace(path_png, final)
        q = norm(quote)
        qs = (q[:240] + "…") if len(q) > 240 else q
        desc = (
            f"Trích dẫn nguyên văn từ bản án ({pdf_name}, trang {page_no}), đoạn liên quan đã được tô cam: «{qs}»"
            if verified
            else f"Trang {page_no} của bản án ({pdf_name}) — bản scan, CHƯA có text/OCR nên nội dung chữ chưa được xác thực."
        )
        assets.append({
            "id": aid, "type": "image", "file": f"{args.docs_rel}/{aid}-{kind}.png", "source": "pdf",
            "kind": kind, "width": w, "height": h, "description": desc,
            "tags": ["bản án", "tài liệu", kind], "suggested_slug": f"court-judgment-{kind}",
            "visual_language": "document",
            "suitability_notes": "Bằng chứng từ bản án thật: dùng ở scene nhắc tới bản án, hình phạt, điều luật, số liệu; hiển thị rõ chữ, không làm mờ.",
            "provenance": {"pdf": pdf_name, "page": page_no, "bbox": [round(v, 1) for v in bbox], "quote": q, "verified": verified},
        })

    for pdf_path in pdfs:
        pdf_name = os.path.basename(pdf_path)
        doc = pymupdf.open(pdf_path)
        pinfo, tp = [], []
        for i, page in enumerate(doc):
            pno = i + 1
            text = norm(page.get_text())
            has = len(text) >= TEXT_LAYER_MIN_CHARS
            pinfo.append({"page": pno, "chars": len(text), "hasTextLayer": has, "needsOcr": not has})
            pix = page.get_pixmap(matrix=pymupdf.Matrix(2, 2), alpha=False)
            pix.save(os.path.join(pages_dir, f"{slug(os.path.splitext(pdf_name)[0])}-p{pno:02d}.png"))
            if has:
                tp.append((pno, text))
                all_text_pages.append((pno, text))
        summary_pdfs.append({"file": pdf_name, "sha256": sha256(pdf_path), "pageCount": len(pinfo), "pages": pinfo})

        # --- mục tiêu mặc định (chỉ trên trang có text-layer) ---
        # Bản án phúc thẩm tóm tắt cả bản án sơ thẩm ở phần trước, nên verdict/law CHỈ tìm từ dòng
        # tiêu đề "QUYẾT ĐỊNH:" (lần xuất hiện CUỐI) trở đi; không thấy tiêu đề đó mới dùng cả văn bản.
        page_line_cache = {pno: page_lines(doc[pno - 1]) for pno, _ in tp}
        anchor = None
        for pno, _ in tp:
            for idx, (lt, _r) in enumerate(page_line_cache[pno]):
                if DECISION_RE.match(lt):
                    anchor = (pno, idx)
        decision_pages = [(pno, t) for pno, t in tp if anchor is None or pno >= anchor[0]]

        def emit(kind, pno, lines, idx, before, after):
            lo, hi = max(0, idx - before), min(len(lines), idx + after + 1)
            tmp = os.path.join(args.out_dir, "_tmp.png")
            clip, w, h = render_crop(doc, doc[pno - 1], [r for _, r in lines[lo:hi]], 8, 8, tmp, [lines[idx][1]])
            add_asset(kind, pdf_name, pno, tuple(clip), " ".join(t for t, _ in lines[lo:hi]), True, tmp, w, h)

        for kind, rx, before, after, cap in TARGETS:
            got = 0
            pages_for = tp if kind == "header" else decision_pages
            for pno, _ in pages_for:
                if got >= cap:
                    break
                lines = page_line_cache[pno]
                for idx, (lt, lr) in enumerate(lines):
                    if anchor and pno == anchor[0] and idx < anchor[1] and kind != "header":
                        continue
                    if not rx.search(lt):
                        continue
                    emit(kind, pno, lines, idx, before, after)
                    got += 1
                    break  # 1 lần/trang/kind
        # kind không khớp gì -> im lặng bỏ qua (không bịa)

        # --- cụm người dùng chỉ định ---
        for phrase in highlights:
            hit = False
            for pno, _ in tp:
                page = doc[pno - 1]
                rects = page.search_for(phrase)
                if not rects:
                    continue
                tmp = os.path.join(args.out_dir, "_tmp.png")
                clip, w, h = render_crop(doc, page, rects, 60, 60, tmp, rects)
                add_asset("highlight", pdf_name, pno, tuple(clip), phrase, True, tmp, w, h)
                hit = True
                break
            if not hit:
                not_found.append(phrase)

        # --- PDF/trang scan: chỉ render nguyên trang 1 (nếu là scan), đánh dấu chưa xác thực ---
        if pinfo and pinfo[0]["needsOcr"]:
            page = doc[0]
            tmp = os.path.join(args.out_dir, "_tmp.png")
            clip, w, h = render_crop(doc, page, [page.rect], 0, 0, tmp, [])
            add_asset("scan-page", pdf_name, 1, tuple(clip), "", False, tmp, w, h)
        doc.close()

    facts = extract_facts(all_text_pages)
    result = {
        "ok": True,
        "pdfs": summary_pdfs,
        "facts": facts,
        "assets": assets,
        "highlightsNotFound": not_found,
        "needsOcr": any(p["needsOcr"] for d in summary_pdfs for p in d["pages"]),
    }

    if args.script and os.path.exists(args.script):
        result["crosscheck"] = crosscheck(args.script, all_text_pages, facts, os.path.join(args.out_dir, "crosscheck.md"))

    with open(os.path.join(args.out_dir, "case-facts.json"), "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(json.dumps({
        "ok": True, "assets": len(assets), "pages": sum(d["pageCount"] for d in summary_pdfs),
        "needsOcr": result["needsOcr"], "highlightsNotFound": not_found,
        "crosscheck": {k: result.get("crosscheck", {}).get(k) for k in ("found", "near", "missing")},
    }, ensure_ascii=False))
    return 0


# ---------- đối chiếu script ↔ PDF (chỉ cảnh báo) ----------
def crosscheck(script_path, page_texts, facts, out_md):
    with open(script_path, encoding="utf-8") as f:
        script = norm(f.read())
    pdf_text = " ".join(t for _, t in page_texts)
    pdf_amounts = [x["vnd"] for x in facts["so_tien"] if x.get("vnd")]
    # số tiền cả dạng "2 tỷ 500 triệu" không gộp — chỉ so từng mốc; đánh dấu 'near' khi lệch ≤5%
    rows = []
    for m in MONEY_RE.finditer(script):
        v = money_to_vnd(m.group(0))
        if v is None:
            continue
        if any(v == a for a in pdf_amounts):
            st = "found"
        elif any(abs(v - a) <= 0.05 * a for a in pdf_amounts):
            st = "near"
        else:
            st = "missing"
        rows.append(("Số tiền", norm(m.group(0)), st))
    money_spans = [m.span() for m in MONEY_RE.finditer(script)]
    for m in re.finditer(r"(?<![\w.,])\d[\d.,]*\d|(?<![\w.,])\d{2,}(?![\w.,])", script):
        if any(a <= m.start() < b for a, b in money_spans):
            continue
        tok = m.group(0)
        digits = re.sub(r"[.,]", "", tok)
        if len(digits) < 2:
            continue
        st = "found" if re.search(rf"(?<![\d.,]){re.escape(tok)}(?![\d.,])", pdf_text) or re.search(rf"(?<!\d){digits}(?!\d)", pdf_text) else "missing"
        rows.append(("Con số/năm", tok, st))
    for m in re.finditer(r"Điều\s+\d+", script, re.I):
        v = norm(m.group(0))
        rows.append(("Điều luật", v, "found" if re.search(re.escape(v), pdf_text, re.I) else "missing"))
    seen, uniq = set(), []
    for r in rows:
        if (r[0], r[1]) not in seen:
            seen.add((r[0], r[1]))
            uniq.append(r)
    icon = {"found": "✔ khớp", "near": "≈ gần khớp (≤5%)", "missing": "✗ KHÔNG thấy trong PDF"}
    cnt = {s: sum(1 for r in uniq if r[2] == s) for s in ("found", "near", "missing")}
    lines = ["# Đối chiếu script ↔ PDF bản án (tự động, chỉ cảnh báo)", "",
             f"Khớp: {cnt['found']} · Gần khớp: {cnt['near']} · Không thấy: {cnt['missing']}", "",
             "Lưu ý: 'không thấy' có thể là cách diễn đạt khác (làm tròn, đổi đơn vị, tên gọi) — cần người kiểm tra, KHÔNG phải kết luận sai.", "",
             "| Loại | Trong script | Kết quả |", "|---|---|---|"]
    lines += [f"| {k} | {v} | {icon[s]} |" for k, v, s in sorted(uniq, key=lambda r: ("found", "near", "missing").index(r[2]) * -1)]
    with open(out_md, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    return {**cnt, "items": [{"kind": k, "value": v, "status": s} for k, v, s in uniq]}


if __name__ == "__main__":
    sys.exit(main())
