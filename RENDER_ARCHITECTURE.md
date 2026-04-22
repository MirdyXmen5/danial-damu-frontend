# Архитектура развертывания на Render.com

## 📐 Диаграмма развертывания

```
                         GitHub Repository
                         ↓
            ┌────────────┴────────────┐
            ↓                         ↓
    ┌─────────────────┐      ┌─────────────────┐
    │  Render Backend │      │ Render Frontend │
    │   (Python)      │      │    (Node.js)    │
    ├─────────────────┤      ├─────────────────┤
    │ Gunicorn Server │      │  npm start      │
    │  Port: 8000     │      │  Port: 3000     │
    │  Django App     │      │  React App      │
    └────────┬────────┘      └────────┬────────┘
             │                        │
             │                        │
      https://<backend>        https://<frontend>
      .onrender.com           .onrender.com
             ↓                        ↓
    ┌─────────────────────────────────────────┐
    │         Интернет Пользователи           │
    └─────────────────────────────────────────┘
```

## 🔄 Поток данных

```
[Browser]
   ↓
   ├─ GET / ──────────────────→ [Frontend React App]
   │                              ├─ Загружает App.jsx
   │                              ├─ Загружает CSS/JS
   │                              └─ Отправляет API запросы
   │                                      ↓
   └─ GET /api/images ────────→ [Backend Django]
                                   ├─ Обрабатывает запрос
                                   ├─ Возвращает JSON
                                   └─ CORS проверка ✅
```

## 🏗️ Компоненты системы

### Frontend (Render Web Service - Node)
```
┌─────────────────────────────────────┐
│         Frontend Container          │
├─────────────────────────────────────┤
│ Node.js v20                         │
│ npm install                         │
│ npm run build      → dist/          │
│ npm start          → serve (3000)   │
│ PORT env variable  → dynamic port   │
└─────────────────────────────────────┘
     ↓ Env Variables
   VITE_API_URL = https://backend.com
   NODE_ENV = production
```

### Backend (Render Web Service - Python)
```
┌─────────────────────────────────────┐
│         Backend Container           │
├─────────────────────────────────────┤
│ Python 3.11+                        │
│ pip install -r requirements.txt     │
│ python manage.py migrate            │
│ gunicorn wsgi --bind 0.0.0.0:$PORT  │
│ PORT env variable  → dynamic port   │
└─────────────────────────────────────┘
     ↓ Env Variables
   DEBUG = False
   SECRET_KEY = ***
   ALLOWED_HOSTS = backend.com
   CORS_ALLOWED_ORIGINS = https://frontend.com
```

## 🔐 CORS и Безопасность

```
Frontend Request:
┌─────────────────────────────────────┐
│ Origin: https://frontend.com        │
│ GET /api/images                     │
│ Authorization: Bearer <token>       │
└─────────────────────────────────────┘
                ↓
         [Backend Проверка]
                ↓
    Разрешено ли Origin?
    ├─ Да ✅ → Возвращить данные
    └─ Нет ❌ → CORS Error (403)
```

## 📦 File Structure на Render

### Frontend Service
```
/app/
├── node_modules/
├── dist/               ← Собранный React (после build)
│   ├── index.html
│   ├── assets/
│   └── ...
├── src/
├── package.json
├── vite.config.js
└── .env.production     ← Переменные для build
```

### Backend Service
```
/app/
├── backend/
│   ├── config/
│   ├── images/
│   ├── manage.py
│   └── ...
├── requirements.txt
└── .env                ← Переменные для runtime
```

## 🚀 Процесс развертывания

### Initial Deploy

```
1. [You] git push
      ↓
2. GitHub Webhook
      ↓
3. Render detects push
      ↓
4. [Backend] Build phase
   - Install deps: pip install -r requirements.txt
   - Migrate: python manage.py migrate
   - Start: gunicorn wsgi --bind 0.0.0.0:$PORT
      ↓
5. [Backend] Running ✅
      ↓
6. [Frontend] Build phase
   - Install: npm install
   - Build: npm run build
   - Start: npm start
      ↓
7. [Frontend] Running ✅
      ↓
8. URLs Ready
   - Frontend: https://service-name.onrender.com
   - Backend: https://backend-name.onrender.com
```

### Subsequent Updates

```
[You] git push
   ↓ (Auto-deploy enabled)
Render rebuild & deploy
   ↓
Service restarts
   ↓
New code live
```

## 💾 Environment Flow

### Development
```
Local Machine
├── .env.development
│   └─ VITE_API_URL=http://localhost:8000
├── npm run dev
└── python manage.py runserver
```

### Production (Render)
```
Render Dashboard
├── Environment Variables (UI)
│   ├─ VITE_API_URL=https://backend.onrender.com
│   ├─ DEBUG=False
│   ├─ SECRET_KEY=***
│   └─ ...
├── Build & Start
└── Service Running
```

## 🔍 Мониторинг и Логи

```
Render Dashboard
├── Services → Your Service
│   ├── Logs
│   │   ├─ Build logs
│   │   └─ Runtime logs
│   ├── Metrics
│   │   ├─ CPU usage
│   │   ├─ Memory usage
│   │   └─ Requests/sec
│   └── Settings
│       └─ Env variables, redeploy, etc.
```

## ⚠️ Troubleshooting Flow

```
Something's broken?
        ↓
1. Check Frontend URL loads
   └─ No → Check Frontend Logs in Render
2. Check Backend API responds
   └─ No → Check Backend Logs in Render
3. Check DevTools Console (F12)
   └─ CORS Error? → Update CORS_ALLOWED_ORIGINS
   └─ API 404? → Check VITE_API_URL env var
4. Check Network tab
   └─ Failed requests? → Check backend service status
```

## 📊 Performance Optimization

```
Frontend
├── npm run build (optimized dist/)
├── Minified JS/CSS
├── Tree-shaking unused code
└── Serve static efficiently

Backend
├── Gunicorn workers
├── Database connection pooling
├── Caching headers
└── Efficient queries
```

---

*Это архитектура для стабильного production-ready развертывания! 🎯*
