import json, io, os
os.chdir(r'C:\vox-style-xe-giay-v1-hyperframes\poc\mascot-aroll\run-flydubai')
S = 'flydubai-fz1073'
man = {a['id']: a for a in json.load(io.open(f'pipeline/videos/{S}/media-analysis/manifest.json', encoding='utf-8'))}
plan = {s['id']: s for s in json.load(io.open(f'planning/videos/{S}/scene-plan.json', encoding='utf-8'))}
shots = json.load(io.open(f'planning/videos/{S}/shotlist.json', encoding='utf-8'))
W, H = 1080, 1920
print('id | WxH nguon | ti le | he so cover | phan bi cat | camera | scene (diem vision)')
for sh in shots:
    aid = sh.get('assetId')
    if not aid:
        continue
    m = man[aid]
    w, h = m.get('width'), m.get('height')
    if not w:
        print(aid, 'khong co kich thuoc'); continue
    cover = max(W / w, H / h)           # he so phong de phu kin khung (object-fit: cover)
    visible_w = W / (w * cover)          # ti le chieu rong nguon con hien thi
    visible_h = H / (h * cover)
    cropped = 1 - min(visible_w, visible_h) * 1.0 if False else 1 - (visible_w * visible_h)
    print(f"{sh['id']:7s} {aid:7s} | {w}x{h} | {w/h:.2f} | x{cover:.2f} | cat {cropped*100:3.0f}% dien tich | {sh.get('cameraMotion'):10s} | {plan[sh['sceneId']]['presentationStyle']}")
