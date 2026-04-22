# 🏗️ Команды и ссылки для быстрого доступа

## 🔗 Важные ссылки

```
Render Dashboard:     https://render.com/dashboard
GitHub Account:       https://github.com/settings/tokens
DjeCrety (Secret Key): https://djecrety.ir/
Django Docs:          https://docs.djangoproject.com/en/4.2/
Node/Npm:             https://nodejs.org/
```

---

## 📦 Локальное тестирование

### Frontend тестирование

```bash
# Переход в папку frontend
cd frontend

# Установка зависимостей
npm install

# Development сервер (с hot reload)
npm run dev
# Откройте http://localhost:5173

# Production сборка
npm run build

# Production сервер (как на Render)
npm start
# Откройте http://localhost:3000

# Линтинг
npm run lint

# Очистка
rm -rf node_modules dist
npm cache clean --force
```

### Backend тестирование

```bash
# Переход в папку backend
cd backend

# Установка зависимостей
pip install -r requirements.txt

# Создание миграций
python manage.py makemigrations

# Применение миграций
python manage.py migrate

# Создание superuser
python manage.py createsuperuser

# Development сервер
python manage.py runserver 0.0.0.0:8000
# Откройте http://localhost:8000

# Production проверки
python manage.py check --deploy

# Сборка статических файлов
python manage.py collectstatic --noinput

# Запуск с Gunicorn (как на Render)
gunicorn config.wsgi:application --bind 0.0.0.0:8000

# Запуск с Gunicorn и workers
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3
```

---

## 🔐 Генерация SECRET_KEY

### Способ 1: Django
```bash
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

### Способ 2: Python
```bash
python -c 'import secrets; print(secrets.token_urlsafe(50))'
```

### Способ 3: Openssl
```bash
openssl rand -base64 50
```

### Способ 4: Online
https://djecrety.ir/ (копируй генерированное значение)

---

## 🚀 Git команды

```bash
# Проверка статуса
git status

# Добавить все файлы
git add .

# Commit с сообщением
git commit -m "Your message"

# Push в main ветку
git push origin main

# Push в другую ветку
git push origin branch-name

# Просмотр истории
git log --oneline

# Отмена последнего commit (до push)
git reset --soft HEAD~1

# Удалить неслеженные файлы
git clean -fd

# Проверить что будет закоммичено
git diff --staged
```

---

## 🐳 Docker команды (если нужно локально)

```bash
# Просмотр всех контейнеров
docker ps -a

# Просмотр запущенных контейнеров
docker ps

# Запуск docker-compose
docker compose up -d

# Остановка
docker compose down

# Перестройка
docker compose up --build -d

# Логи
docker compose logs -f backend
docker compose logs -f frontend

# Вход в контейнер
docker compose exec backend bash
docker compose exec frontend sh

# Очистка всего
docker system prune -a
```

---

## 📊 Переменные окружения для Copy-Paste

### Backend (.env или Render)
```env
DEBUG=False
SECRET_KEY=django-insecure-1234567890qwertyuiopasdfghjklzxcvbnmqwertyuiopas
ALLOWED_HOSTS=danial-damu-backend.onrender.com,localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=https://danial-damu-frontend.onrender.com,http://localhost:3000,http://localhost:5173
DATABASE_URL=sqlite:///db.sqlite3
```

### Frontend (.env или Render)
```env
VITE_API_URL=https://danial-damu-backend.onrender.com
NODE_ENV=production
```

### Development (.env.development)
```env
VITE_API_URL=http://localhost:8000
```

---

## 🔍 Быстрые проверки

### Проверка что всё работает (Backend)
```bash
curl http://localhost:8000/api/images/
# Должен вернуть JSON или {"detail":"..."}
```

### Проверка что всё работает (Frontend)
```bash
curl http://localhost:3000/
# Должен вернуть HTML
```

### Проверка DNS
```bash
nslookup danial-damu-backend.onrender.com
nslookup danial-damu-frontend.onrender.com
```

### Проверка портов
```bash
# Linux/Mac
lsof -i :8000    # backend
lsof -i :3000    # frontend
lsof -i :5173    # dev frontend

# Windows
netstat -ano | findstr :8000
```

---

## 📝 Быстрый Deploy Скрипт

### Linux/Mac
```bash
#!/bin/bash
set -e

echo "🔨 Building..."
git add .
git commit -m "Deploy $(date)"
git push origin main

echo "✅ Pushed to GitHub"
echo "🚀 Render will auto-deploy..."
echo "📊 Check dashboard: https://render.com/dashboard"
```

Сохраните как `deploy.sh` и запустите:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🎯 Чек-лист перед Deploy

```bash
# Frontend
cd frontend
npm run lint        # ✅ Нет ошибок?
npm run build       # ✅ Сборка успешна?
npm start          # ✅ Работает локально?

# Backend
cd ../backend
python manage.py check --deploy  # ✅ Нет проблем?
python manage.py test            # ✅ Тесты проходят?

# Git
git status         # ✅ Все файлы добавлены?
git log --oneline -5  # ✅ История нормальная?

# Deploy
git push origin main  # 🚀 Push!
```

---

## 🆘 Быстрые Fix команды

### Очистить кэш npm
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### Очистить кэш pip
```bash
pip cache purge
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

### Переустановить зависимости с нуля
```bash
# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
rm -rf venv
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

### Hard reset последних изменений
```bash
# Отмена всех локальных изменений
git checkout .

# Отмена всех untracked файлов
git clean -fd
```

---

## 📱 Проверка Mobile версии

```bash
# Linux/Mac
# Откройте Developer Tools (F12)
# Нажмите Ctrl+Shift+M (или Cmd+Shift+M на Mac)

# Или используйте мобильное устройство:
# Если localhost:
#   Linux: найдите IP машины (hostname -I)
#   Mac:   найдите IP машины (ifconfig)
#   Откройте http://<your-ip>:3000 в мобильном браузере
```

---

## 🎬 Пример полного Deploy цикла

```bash
# 1️⃣ Проверка кода локально
cd frontend && npm run build && npm start
# (Откройте в браузере, проверьте всё работает)

# 2️⃣ Если OK, коммитим
cd ..
git add .
git commit -m "Fix: Update API endpoint"

# 3️⃣ Push в GitHub
git push origin main

# 4️⃣ Откройте Render Dashboard
# https://render.com/dashboard

# 5️⃣ Смотрите логи
# Services → Your Frontend → Logs

# 6️⃣ Ждите ~2-3 минуты до Deploy

# 7️⃣ Проверьте что работает
# https://your-frontend.onrender.com

# 8️⃣ Если ошибка - смотрите Runtime Logs в Render
```

---

## 🎓 Полезные SSH команды для сервера

```bash
# Если вам дали SSH доступ к серверу:

# Вход на сервер
ssh user@your-server.com

# Просмотр логов
tail -f /var/log/app.log

# Перезагрузка приложения
systemctl restart your-app

# Проверка статуса
systemctl status your-app

# Проверка дискового пространства
df -h

# Проверка использования памяти
free -h

# Просмотр процессов
ps aux | grep python
ps aux | grep node
```

---

## 📞 Когда нужна помощь

| Проблема | Где смотреть |
|----------|-----------|
| Build ошибка | Render Logs → Build Logs |
| Runtime ошибка | Render Logs → Runtime Logs |
| Белый экран | Browser DevTools → Console (F12) |
| API ошибка | Browser DevTools → Network (F12) |
| Локально не работает | Terminal вывод, npm/python ошибки |
| Deploy не стартует | git push должен был сработать, проверьте GitHub |

---

**Копируй нужную команду и выполняй! 🚀**

*Если чего-то не понял - смотри полные гайды в RENDER_DEPLOYMENT.md*
