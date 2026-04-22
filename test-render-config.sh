#!/bin/bash
# Скрипт для локального тестирования конфигурации Render

echo "🔍 Проверка конфигурации для Render..."
echo ""

# Проверка Node и npm
echo "✓ Node версия:"
node --version
echo "✓ NPM версия:"
npm --version
echo ""

# Проверка Frontend
echo "📦 Установка зависимостей Frontend..."
cd frontend
npm install

echo "🔨 Сборка Frontend..."
npm run build

if [ -d "dist" ]; then
    echo "✅ Frontend успешно собран"
    echo "📊 Размер dist:"
    du -sh dist/
else
    echo "❌ Ошибка сборки Frontend"
    exit 1
fi

echo ""
echo "✨ Frontend готов к деплою на Render!"
echo ""
echo "Следующие шаги:"
echo "1. Push изменения в GitHub"
echo "2. Подключить репозиторий в Render"
echo "3. Установить переменную окружения: VITE_API_URL=https://your-backend-url.onrender.com"
echo "4. Deploy!"
