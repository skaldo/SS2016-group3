@echo off
:begin
title  
color 0a
echo ===================== Select a task ======================
echo.  
echo 0) Please go to https://nodejs.org/en/ and install Node.js (LTS Version should be fine)
echo 1) Install Ionic
echo 2) Install NPM Dependencies
echo 3) Ionic Serve
echo 4) Run Server
echo 5) Exit
echo.
set /p op=Type option:
if "%op%"=="1" goto op1
if "%op%"=="2" goto op2
if "%op%"=="3" goto op3
if "%op%"=="4" goto op4
if "%op%"=="5" goto exit

echo Please Pick an option:
goto begin


:op1
echo ToDo
goto begin

:op2
echo ToDO
goto begin

:op3
start cmd.exe /k  "cd BusDriveApp && ionic serve"
goto begin

:op4
start cmd.exe /k  "cd TestServer-Json && json-server -w TestServer.json"
goto begin

:exit
@exit