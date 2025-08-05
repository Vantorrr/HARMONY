#!/bin/bash

echo "🚀 Запуск Центра Развития Ребенка 'ГАРМОНИЯ'"
echo "=========================================="

# Проверяем установлен ли Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен!"
    echo "Скачайте с https://nodejs.org/"
    exit 1
fi

# Проверяем установлен ли npm
if ! command -v npm &> /dev/null; then
    echo "❌ NPM не установлен!"
    exit 1
fi

echo "✅ Node.js установлен: $(node --version)"
echo "✅ NPM установлен: $(npm --version)"
echo ""

# Устанавливаем зависимости если нужно
if [ ! -d "node_modules" ]; then
    echo "📦 Устанавливаем зависимости..."
    npm install
fi

echo "🌟 Запускаем сервер..."
echo ""
echo "🌐 Ссылки:"
echo "   Клиенты: http://localhost:3000"
echo "   Админка: http://localhost:3000/admin"
echo ""
echo "🔐 Тестовые данные:"
echo "   Клиент - телефон: любой, SMS: любой"
echo "   Админ - логин: admin, пароль: admin123"
echo ""
echo "🛑 Для остановки нажмите Ctrl+C"
echo "=========================================="

# Запускаем сервер
npm run dev