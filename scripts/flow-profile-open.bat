@echo off
setlocal enabledelayedexpansion
REM Double-click de mo nhanh Chrome dung profile Flow (khong can go lenh terminal).
REM Co the go tham so khi chay tu Command Prompt: flow-profile-open.bat flow-02
REM
REM Loi that da xay ra (2026-09-22): double-click KHONG truyen duoc tham so, nen truoc day
REM script am tham mac dinh ve "default" -> nguoi dung tuong dang mo profile MOI nhung thuc ra
REM mo lai profile "default" da dang nhap san (production dang dung that), dang nham tai khoan
REM khac vao do. Tu nay, neu double-click khong kem ten account, BAT NAY HOI LAI truoc khi mo.
if "%~1"=="" (
  echo Ban chua chi dinh ten account.
  echo   - Go ten account roi Enter de mo/tao profile do ^(vd: flow-02^)
  echo   - Go "default" roi Enter neu that su muon mo lai profile production dang dung
  echo   - Go -ListAccounts de xem danh sach profile da co
  echo   - Chi bam Enter ^(khong go gi^) se HUY, khong mo gi ca
  set /p ACCOUNT_INPUT="Ten account: "
  if "!ACCOUNT_INPUT!"=="" (
    echo Da huy - khong mo profile nao.
    pause
    exit /b 0
  )
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0flow-profile-open.ps1" !ACCOUNT_INPUT!
) else (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0flow-profile-open.ps1" %*
)
pause
