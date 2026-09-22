@echo off
REM Double-click de mo dung profile "flow-02" (du kien: binhthuan) - KHONG hoi gi them.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0flow-profile-open.ps1" flow-02
pause
