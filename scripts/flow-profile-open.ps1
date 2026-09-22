<#
  Mo nhanh Chrome tro dung profile Flow cua 1 account, KHONG qua agent-browser (dung cach setup
  thu cong da ghi trong header comment scripts/02b-media-generate.router.mjs va
  planning/responsibility-matrix.md muc 2b). Dung de:
  (1) Dang nhap thu cong lan dau cho account MOI - script tu tao thu muc profile neu chua co.
  (2) Mo lai profile da dang nhap de xem/quan ly (kiem tra credit, dang nhap lai khi session het
      han, giai CAPTCHA...) ma khong can nho Claude hay go lenh agent-browser tren terminal.

  Usage (thuong chay qua flow-profile-open.bat, double-click duoc):
    flow-profile-open.bat                 mo account "default"
    flow-profile-open.bat flow-02         mo (hoac tao moi neu chua co) account "flow-02"
    flow-profile-open.bat -ListAccounts   liet ke cac profile da co tren dia

  QUAN TRONG: truoc khi dang nhap LAN DAU cho 1 account MOI, dong HET Chrome dang chay (ke ca
  chay nen - Chrome Settings > "Continue running background apps"), neu khong --user-data-dir
  co the bi bo qua am tham (gotcha that da gap, xem responsibility-matrix.md muc 2b).
#>
param(
  [Parameter(Position = 0)]
  [string]$Account = "default",
  [switch]$ListAccounts
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$profilesRoot = Join-Path $repoRoot "pipeline\.flow-profile"

if ($ListAccounts) {
  Write-Host "Cac profile Flow da co tren dia ($profilesRoot):"
  if (Test-Path $profilesRoot) {
    $found = Get-ChildItem -Path $profilesRoot -Directory
    if ($found) {
      $found | ForEach-Object { Write-Host "  - $($_.Name)" }
    } else {
      Write-Host "  (thu muc ton tai nhung rong)"
    }
  } else {
    Write-Host "  (chua co profile nao - chay lai script voi ten account de tao moi)"
  }
  exit 0
}

$profileDir = Join-Path $profilesRoot $Account
$isNew = -not (Test-Path $profileDir)
if ($isNew) {
  New-Item -ItemType Directory -Force -Path $profileDir | Out-Null
  Write-Host "Tao profile MOI cho account '$Account' tai $profileDir"
  Write-Host "-> Cua so Chrome sap mo CHUA dang nhap gi. Dang nhap Google Flow thu cong trong do,"
  Write-Host "   xong thi dong cua so lai. Sau do them '$Account' vao scripts/flow-accounts.json"
  Write-Host "   (truong 'priority') neu muon dung cho auto-fallback."
} else {
  Write-Host "Mo profile da co cua account '$Account' tai $profileDir"
}

$runningChrome = Get-Process chrome -ErrorAction SilentlyContinue
if ($runningChrome) {
  Write-Host ""
  Write-Host "CANH BAO: dang co Chrome khac chay (ke ca chay nen). Neu cua so vua mo dung NHAM" -ForegroundColor Yellow
  Write-Host "  profile (vd van thay tai khoan Google cu), dong HET Chrome (Settings > Continue" -ForegroundColor Yellow
  Write-Host "  running background apps) roi chay lai script nay." -ForegroundColor Yellow
  Write-Host ""
}

$chromeCandidates = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:LocalAppData\Google\Chrome\Application\chrome.exe"
)
$chromeExe = $chromeCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $chromeExe) {
  throw "Khong tim thay chrome.exe o cac duong dan cai dat thong thuong. Kiem tra lai Chrome da cai chua."
}

Start-Process -FilePath $chromeExe -ArgumentList @(
  "--user-data-dir=$profileDir",
  "https://flow.google.com/"
)
