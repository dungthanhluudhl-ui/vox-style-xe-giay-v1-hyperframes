@echo off
REM Double-click de mo dung profile "flow-03" (du kien: cloud1) - KHONG hoi gi them.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0flow-profile-open.ps1" flow-03
pause
