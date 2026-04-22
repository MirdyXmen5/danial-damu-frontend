# Инструкция по развертыванию на render.com

## Шаг 1: Подготовка репозитория GitHub

1. Убедитесь, что весь код загружен в GitHub репозиторий:
```bash
git add .
git commit -m "Prepare for render.com deployment"
git push origin main
```

## Шаг 2: Развертывание Backend (Django) на Render

1. Перейдите на https://render.com
2. Нажмите **"New +"** и выберите **"Web Service"**
3. Подключите ваш GitHub репозиторий
4. Заполните поля:
   - **Name**: `danial-damu-backend`
   - **Environment**: `Python 3`
   - **Build Command**: 
     ```
     pip install -r backend/requirements.txt && python backend/manage.py migrate
     ```
   - **Start Command**:
     ```
     gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
     ```
   - **Root Directory**: `backend` (опционально)

5. Установите переменные окружения в **Environment**:
   ```
   DEBUG=False
   ALLOWED_HOSTS=your-backend-service.onrender.com
   SECRET_KEY=your-secret-key-here
   CORS_ALLOWED_ORIGINS=https://your-frontend-service.onrender.com
   DATABASE_URL=postgresql://...  (если используете БД)
   ```

6. Нажмите **Deploy**

7. Скопируйте URL вашего Backend: `https://your-backend-service.onrender.com`

## Шаг 3: Развертывание Frontend (React) на Render

1. В Render нажмите **"New +"** → **"Web Service"**
2. Подключите тот же GitHub репозиторий
3. Заполните поля:
   - **Name**: `danial-damu-frontend`
   - **Environment**: `Node`
   - **Build Command**:
     ```
     npm install && npm run build
     ```
   - **Start Command**:
     ```
     npm start
     ```
   - **Root Directory**: `frontend` (если структура такая)

4. Установите переменные окружения в **Environment**:
   ```
   VITE_API_URL=https://your-backend-service.onrender.com
   NODE_ENV=production
   ```

5. Установите **Auto-Deploy**: `Yes` (для автоматического развертывания при push)

6. Нажмите **Deploy**

## Шаг 4: Обновление Backend для CORS

В файле `backend/config/settings.py` убедитесь, что CORS правильно настроен:

```python
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend-service.onrender.com",
    "http://localhost:3000",  # для локальной разработки
]

# Если использует переменную окружения:
CORS_ALLOWED_ORIGINS = os.getenv(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:3000"
).split(",")
```

## Шаг 5: Обновление Frontend URL в Render

1. После развертывания frontend, откройте его и нажмите **"Environment"**
2. Обновите переменную `VITE_API_URL` на полный URL вашего backend
3. Нажмите **"Save"** - это вызовет переdeployment

## Шаг 6: Проверка работоспособности

1. Откройте URL вашего frontend: `https://your-frontend-service.onrender.com`
2. Проверьте:
   - Страница загружается корректно
   - Можно перейти по ссылкам (Home, About, etc.)
   - Admin панель доступна по `/panel/login`
   - API запросы отправляются на правильный backend

## Локальное тестирование перед деплоем

```bash
# Frontend
cd frontend
npm install
npm run build
npm start  # это запустит serve на порту 3000

# Backend (отдельный терминал)
cd backend
pip install -r requirements.txt
python manage.py runserver
```

## Решение проблем

### CORS ошибки:
- Проверьте `VITE_API_URL` в переменных окружения Frontend
- Убедитесь, что `CORS_ALLOWED_ORIGINS` в Backend включает URL Frontend

### API не доступен:
- Проверьте, что Backend сервис работает (посетите его URL)
- Убедитесь, что `VITE_API_URL` правильный (не забудьте `https://`)

### Frontend не загружается:
- Проверьте сборку: `npm run build` локально
- Посмотрите логи в Render: Services → ваш сервис → Logs

### Белый экран:
- Откройте DevTools (F12) и проверьте Console на ошибки
- Проверьте Network tab - какие запросы не загружаются?

## Полезные ссылки

- Render Docs: https://render.com/docs
- Environment Variables: https://render.com/docs/environment-variables
- Django on Render: https://render.com/docs/deploy-django
- Node on Render: https://render.com/docs/deploy-node-express

## Полезные команды для Render

```bash
# Просмотр логов локально перед деплоем
npm run build   # Frontend
gunicorn config.wsgi:application --bind 0.0.0.0:8000  # Backend

# Проверка синтаксиса
npm run lint    # Frontend
python manage.py check  # Backend
```
