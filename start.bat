@echo off
chcp 65001 >nul

echo 🚀 Запуск Центра Развития Ребенка 'ГАРМОНИЯ'
echo ==========================================

REM Проверяем установлен ли Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js не установлен!
    echo Скачайте с https://nodejs.org/
    pause
    exit /b 1
)

REM Проверяем установлен ли npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ NPM не установлен!
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js установлен: %NODE_VERSION%
echo ✅ NPM установлен: %NPM_VERSION%
echo.

REM Устанавливаем зависимости если нужно
if not exist "node_modules" (
    echo 📦 Устанавливаем зависимости...
    npm install
)

echo 🌟 Запускаем сервер...
echo.
echo 🌐 Ссылки:
echo    Клиенты: http://localhost:3000
echo    Админка: http://localhost:3000/admin
echo.
echo 🔐 Тестовые данные:
echo    Клиент - телефон: любой, SMS: любой
echo    Админ - логин: admin, пароль: admin123
echo.
echo 🛑 Для остановки нажмите Ctrl+C
echo ==========================================
echo.

REM Запускаем сервер
npm run dev

pause