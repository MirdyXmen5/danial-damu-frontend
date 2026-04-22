# Пошаговая инструкция с примерами для Render UI

## Шаг 1: Подготовка GitHub репозитория

### Убедитесь что всё загружено в GitHub:

```bash
cd /path/to/danial-damu-2

# Проверить статус
git status

# Добавить все изменения
git add .

# Commit
git commit -m "Prepare for render.com deployment"

# Push в main ветку
git push origin main
```

✅ **Результат**: Все файлы должны быть в GitHub

---

## Шаг 2: Регистрация на Render.com

1. Перейдите на https://render.com
2. Нажмите **Sign up** 
3. Выберите **Sign up with GitHub** (проще всего)
4. Авторизуйте Render доступ к вашему GitHub

✅ **Результат**: Вы зарегистрированы на Render

---

## Шаг 3: Развертывание Backend (Django)

### 3.1 Создание Web Service

1. На Render Dashboard нажмите **New +** → **Web Service**

```
┌─────────────────────────────────────┐
│         Dashboard                   │
│  [New +] ▼                          │
│  ├─ Web Service      ← кликните!    │
│  ├─ PostgreSQL                      │
│  ├─ Redis                           │
│  └─ ...                             │
└─────────────────────────────────────┘
```

### 3.2 Подключение GitHub репозитория

1. Выберите **Connect a repository**
2. Найдите ваш репозиторий `danial-damu-2`
3. Нажмите **Connect**

### 3.3 Заполнение конфигурации Backend

Должна открыться форма. Заполните следующим:

```
Name (Service name):
  danial-damu-backend

Environment:
  Python 3          ← Выберите из dropdown

Build Command:
  pip install -r backend/requirements.txt && python backend/manage.py migrate

Start Command:
  gunicorn config.wsgi:application --bind 0.0.0.0:$PORT

Root Directory:
  backend           ← Или оставьте пустым если структура другая
```

### 3.4 Добавление Environment Variables

1. Внизу формы видите **Environment**
2. Нажмите **Add Environment Variable** для каждой переменной:

| Key | Value | Описание |
|-----|-------|---------|
| `DEBUG` | `False` | Production mode |
| `SECRET_KEY` | `django-insecure-xxxxxx` | Сгенерируйте новый! |
| `ALLOWED_HOSTS` | `danial-damu-backend.onrender.com` | Замените на ваш URL |
| `CORS_ALLOWED_ORIGINS` | `https://danial-damu-frontend.onrender.com` | Замените на ваш frontend URL |

**Как генерировать SECRET_KEY:**
```bash
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

Или используйте https://djecrety.ir/

### 3.5 Deploy Backend

1. Нажмите кнопку **Deploy** в конце формы
2. Подождите 2-5 минут пока строится
3. Вверху должно появиться: `✓ Live` с зелёным статусом

```
                    Deployment Status
┌─────────────────────────────────────┐
│ ✓ Live                              │
│ danial-damu-backend.onrender.com    │  ← Скопируйте этот URL!
│ (может быть другое имя)             │
└─────────────────────────────────────┘
```

### 3.6 Скопируйте Backend URL

Нажмите на **Service URL** и скопируйте полный адрес. Должно быть похоже на:
```
https://danial-damu-backend.onrender.com
```

✅ **Результат**: Backend запущен и доступен по HTTP(S)

---

## Шаг 4: Развертывание Frontend (React)

### 4.1 Создание второго Web Service

1. В Dashboard нажмите **New +** → **Web Service**
2. Выберите **Connect a repository**
3. Подключите **ТОТЖЕ РЕПОЗИТОРИЙ** `danial-damu-2`

### 4.2 Заполнение конфигурации Frontend

```
Name (Service name):
  danial-damu-frontend

Environment:
  Node              ← Выберите из dropdown

Build Command:
  npm install && npm run build

Start Command:
  npm start

Root Directory:
  frontend          ← Или оставьте пустым
```

### 4.3 Добавление Environment Variables

Нажмите **Add Environment Variable**:

| Key | Value | Описание |
|-----|-------|---------|
| `VITE_API_URL` | `https://danial-damu-backend.onrender.com` | Используйте URL от шага 3.6! |
| `NODE_ENV` | `production` | Production mode |

⚠️ **Важно**: `VITE_API_URL` должен начинаться с `https://` и быть полным URL backend!

### 4.4 Deploy Frontend

1. Нажмите **Deploy**
2. Подождите 2-5 минут пока собирается
3. Должно появиться `✓ Live` с зелёным статусом

```
                    Deployment Status
┌─────────────────────────────────────┐
│ ✓ Live                              │
│ danial-damu-frontend.onrender.com   │  ← Это ваш сайт!
│ (может быть другое имя)             │
└─────────────────────────────────────┘
```

✅ **Результат**: Frontend запущен!

---

## Шаг 5: Проверка что всё работает

### 5.1 Откройте сайт

1. Нажмите на **Service URL** frontend
2. Должна открыться ваша главная страница
3. Проверьте:
   - [ ] Логотип видно
   - [ ] Текст есть
   - [ ] Навигация работает (кликните на links)
   - [ ] Нет "белого экрана"

### 5.2 Проверьте API запросы

1. Откройте Developer Tools: **F12**
2. Перейдите на вкладку **Network**
3. Обновите страницу: **F5**
4. Найдите запросы к `/api/...`
5. Проверьте статусы:
   - [ ] 200 OK — хорошо! ✅
   - [ ] 403 CORS — ошибка CORS
   - [ ] 404 Not Found — неправильный URL

### 5.3 Если API ошибки

**Ошибка: CORS error**
```
Access to XMLHttpRequest at 'https://backend...' from origin 'https://frontend...'
```

Решение:
1. Откройте Backend в Render → **Environment**
2. Обновите `CORS_ALLOWED_ORIGINS` на точный URL frontend
3. Нажмите **Save** (переdeployment произойдет)
4. Подождите 2 минуты
5. Обновите frontend браузер

**Ошибка: API 404 или timeout**
```
GET https://backend.../ 404 (Not Found)
```

Решение:
1. Откройте Frontend в Render → **Environment**  
2. Проверьте `VITE_API_URL`:
   - Должно быть: `https://danial-damu-backend.onrender.com`
   - Неправильно: `http://...` или без https://
   - Неправильно: `localhost:8000`
3. Нажмите **Save** (переdeployment)
4. Подождите и попробуйте снова

### 5.4 Проверьте Admin панель

1. На frontend откройте `/panel/login`
2. Введите admin credentials
3. Должна открыться админ панель

✅ **Результат**: Всё работает!

---

## Шаг 6: Обновления после deploy

### Когда нужно что-то изменить:

```bash
# 1. Сделайте изменения локально
nano frontend/src/App.jsx
# или любой другой файл

# 2. Git push
git add .
git commit -m "Update feature"
git push origin main

# 3. Render автоматически переdeployит!
# (если включен Auto-deploy)
```

### Если Auto-deploy не включен:

1. В Render Dashboard → Your Service
2. Нажмите кнопку **Manual Deploy**

---

## 📊 Финальная иерархия в Render

```
Render Dashboard
├── Web Service: danial-damu-backend
│   ├── Status: ✓ Live
│   ├── URL: https://danial-damu-backend.onrender.com
│   ├── Environment:
│   │   ├─ DEBUG=False
│   │   ├─ SECRET_KEY=***
│   │   ├─ ALLOWED_HOSTS=danial-damu-backend.onrender.com
│   │   └─ CORS_ALLOWED_ORIGINS=https://danial-damu-frontend.onrender.com
│   └── Logs: [BUILD LOGS] [RUNTIME LOGS]
│
└── Web Service: danial-damu-frontend
    ├── Status: ✓ Live
    ├── URL: https://danial-damu-frontend.onrender.com
    ├── Environment:
    │   ├─ VITE_API_URL=https://danial-damu-backend.onrender.com
    │   └─ NODE_ENV=production
    └── Logs: [BUILD LOGS] [RUNTIME LOGS]
```

---

## 🆘 Troubleshooting

### Проблема: Build fails

**В логах вижу:**
```
Error: module 'xxx' not found
```

**Решение:**
1. Проверьте `requirements.txt` (backend) или `package.json` (frontend)
2. Все зависимости установлены?
3. Посмотрите полный лог в Render → Service → Logs

### Проблема: Service keeps crashing

**Статус: Crashed or Not Available**

**Решение:**
1. Откройте Render → Service → Logs
2. Посмотрите **Runtime Logs** (не Build Logs!)
3. Должна быть ошибка Python или Node.js
4. Исправьте и пушьте обновления

### Проблема: Неправильно отобразилась после update

**Вижу старую версию сайта**

**Решение:**
1. Hard refresh браузера: **Ctrl+Shift+R** (или **Cmd+Shift+R** на Mac)
2. Если не помогло - очистите кэш браузера
3. Откройте в режиме Incognito

---

## ✨ Поздравляем!

Ваш сайт успешно развернут на Render.com! 🎉

```
Frontend: https://danial-damu-frontend.onrender.com
Backend:  https://danial-damu-backend.onrender.com
Admin:    https://danial-damu-frontend.onrender.com/panel/login
```

### Следующие шаги:
- [ ] Протестировать все функции сайта
- [ ] Создать admin account через backend
- [ ] Добавить custom domain (если нужно)
- [ ] Настроить SSL сертификаты (автоматически на Render)

---

**Нужна помощь? Смотрите [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) для подробнее!**
