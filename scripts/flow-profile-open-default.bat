@echo off
REM Double-click de mo dung profile "default" - KHONG hoi gi them, KHONG the nham account.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0flow-profile-open.ps1" default
pause
