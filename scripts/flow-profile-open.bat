@echo off
REM Double-click de mo nhanh Chrome dung profile Flow (khong can go lenh terminal).
REM Keo-tha ten account vao file nay, hoac mo Command Prompt roi chay:
REM   flow-profile-open.bat flow-02
REM Khong truyen gi -> mo account "default". Xem chi tiet trong flow-profile-open.ps1.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0flow-profile-open.ps1" %*
