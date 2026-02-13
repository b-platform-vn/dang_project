@echo off
echo ================================
echo Full Stack Project Quick Start
echo ================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo [X] Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

echo [OK] Docker is running
echo.

REM Start services
echo Starting services...
echo This may take a few minutes on first run...
echo.

docker-compose up --build

REM Note: Use Ctrl+C to stop
