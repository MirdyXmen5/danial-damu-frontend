# Environment Variables Template

## Frontend (.env.production и .env.development)

```env
# API Backend URL
# Production (Render):
VITE_API_URL=https://your-backend-service.onrender.com

# Development (Local):
VITE_API_URL=http://localhost:8000

# Optional: Environment indicator
VITE_APP_ENV=production
```

## Backend (.env или Render Environment Variables)

```env
# Django Security
DEBUG=False
SECRET_KEY=generate-this-with: python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'

# Allowed hosts (comma-separated)
ALLOWED_HOSTS=your-backend-service.onrender.com,localhost,127.0.0.1

# CORS settings (comma-separated URLs)
CORS_ALLOWED_ORIGINS=https://your-frontend-service.onrender.com,http://localhost:3000,http://localhost:5173

# Optional: Database (if not using SQLite)
DATABASE_URL=postgresql://user:password@host:port/dbname

# Optional: Static files
STATIC_URL=/static/
MEDIA_URL=/media/
```

## 🔧 Как генерировать SECRET_KEY для Django

```bash
# Способ 1: Django utils
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'

# Способ 2: Через Python
python -c 'import secrets; print(secrets.token_urlsafe(50))'

# Способ 3: Online generator
# https://djecrety.ir/
```

## 📝 Примеры для разных окружений

### Development (Local)

**frontend/.env.development**
```env
VITE_API_URL=http://localhost:8000
```

**backend/.env (или просто в settings.py)**
```env
DEBUG=True
SECRET_KEY=your-development-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Production (Render)

**Frontend Environment в Render:**
```
VITE_API_URL = https://your-backend.onrender.com
NODE_ENV = production
```

**Backend Environment в Render:**
```
DEBUG = False
SECRET_KEY = <generated-secret-key>
ALLOWED_HOSTS = your-backend.onrender.com
CORS_ALLOWED_ORIGINS = https://your-frontend.onrender.com
```

## 🔐 Безопасность

⚠️ **НИКОГДА** не коммитьте `.env` файлы! Они должны быть в `.gitignore`

Правильно:
```
# .gitignore
.env
.env.local
.env.*.local
```

Неправильно:
```
# ❌ Коммитить этот файл в Git
.env
.env.production
```

Исключение: `.env.example` можно коммитить (без реальных значений)

## 📦 Render Native Environment Variables

Вместо загрузки файлов `.env`, Render использует встроенную систему Environment Variables. Все переменные устанавливаются через Dashboard:

1. Dashboard → Services → Your Service → Environment
2. Добавить переменную (Add Environment Variable)
3. Key = `VITE_API_URL`, Value = `https://your-backend.onrender.com`
4. Сохранить (переdeployment произойдет автоматически)

## ✅ Проверка что переменные правильно загружены

### Frontend (React)
```javascript
console.log(import.meta.env.VITE_API_URL);  // Должен вывести правильный URL
```

### Backend (Django)
```python
from django.conf import settings
print(settings.DEBUG)          # False
print(settings.ALLOWED_HOSTS)  # ['your-backend.onrender.com']
print(settings.CORS_ALLOWED_ORIGINS)  # ['https://your-frontend.onrender.com']
```

---

**Используйте этот файл как шпаргалку при развертывании!** 📋
