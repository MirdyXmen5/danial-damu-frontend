# Шпаргалка для развертывания на Render.com

## 🚀 За 5 минут

### 1. Подготовка
```bash
cd /path/to/danial-damu-2
git add .
git commit -m "Ready for render"
git push origin main
```

### 2. Создайте Backend на Render
- URL: https://render.com/dashboard
- New Web Service → Connect GitHub
- Build: `pip install -r backend/requirements.txt && python backend/manage.py migrate`
- Start: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`
- Env vars → Add:
  ```
  DEBUG = False
  SECRET_KEY = <generate-random>
  ALLOWED_HOSTS = <backend-service-name>.onrender.com
  CORS_ALLOWED_ORIGINS = https://<frontend-service-name>.onrender.com
  ```
- Deploy ✅

### 3. Скопируйте Backend URL
Например: `https://danial-backend.onrender.com`

### 4. Создайте Frontend на Render
- New Web Service → **Same** GitHub repo
- Name: `danial-damu-frontend`
- Environment: `Node`
- Build: `npm install && npm run build`
- Start: `npm start`
- Root Directory: `frontend` (если нужно)
- Env vars → Add:
  ```
  VITE_API_URL = https://danial-backend.onrender.com
  NODE_ENV = production
  ```
- Deploy ✅

### 5. Готово! 🎉
- Frontend: `https://danial-damu-frontend.onrender.com`
- Backend: `https://danial-backend.onrender.com`
- Admin: `https://danial-damu-frontend.onrender.com/panel/login`

---

## 📋 Команды для локальной проверки

```bash
# Frontend
cd frontend
npm install
npm run build
npm start  # Запустить production-подобный сервер

# Backend (в другом терминале)
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

---

## 🔧 Если что-то не работает

| Проблема | Решение |
|----------|---------|
| Белый экран | F12 → Console → ищите ошибку API URL |
| CORS ошибка | Backend Settings → обновить CORS_ALLOWED_ORIGINS |
| API 404 | Frontend env: проверить VITE_API_URL (нужен https://) |
| Build failed | Render Logs → смотреть ошибку, повторить локально |
| Static не загружаются | `npm run build` - проверить локально |

---

## 🔄 Как обновлять после деплоя

```bash
git add .
git commit -m "Update"
git push
# Render автоматически переdeployит за ~2 минуты
```

---

## 📞 Полезные ссылки

- Render Dashboard: https://render.com/dashboard
- Django Deployment: https://docs.djangoproject.com/en/4.2/howto/deployment/
- Environment Variables: https://render.com/docs/environment-variables
- GitHub Integration: https://render.com/docs/github

---

## 💾 Файлы конфигурации

Все файлы уже подготовлены:
- ✅ `.env.production` — для production
- ✅ `.env.development` — для разработки
- ✅ `vite.config.js` — обновлен
- ✅ `render.yaml` — конфиг Render
- ✅ `package.json` — обновлен (npm start работает)
- ✅ `src/App.jsx` — убрана GitHub Pages логика
- ✅ `src/api/axios.js` — использует env переменные

---

## ⚠️ Не забудьте

- [ ] Сгенерировать новый SECRET_KEY для backend
- [ ] Создать superuser после первого деплоя
- [ ] Проверить CORS после деплоя
- [ ] Тестировать локально перед пушем
- [ ] Посмотреть логи Render если есть проблемы

---

Удачи с деплоем! 🚀
