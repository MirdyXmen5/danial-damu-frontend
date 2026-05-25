# DANIYAL DAMU — Корпоративный сайт

Полнофункциональное веб-приложение для крупнейшей сети супермаркетов **«DANIYAL DAMU»**. Современный стек React + Django с Docker, оптимизированный для высокой производительности, мультиязычности и кроссплатформенной адаптивности.

## 🚀 Технологический стек

### Frontend (React)
-   **React 18** — Functional Components & Hooks
-   **Vite** — Ультрабыстрая сборка и HMR
-   **Tailwind CSS** — Система стилизации с кастомными бренд-цветами
-   **Framer Motion** — Плавные анимации и микровзаимодействия
-   **React Router v6** — Клиентская маршрутизация
-   **i18next + react-i18next** — Полная мультиязычность (казахский, русский)
-   **Axios** — HTTP-клиент с интерцепторами
-   **Lucide React** — SVG иконки

### Backend (Django)
-   **Django 5.x** — REST API фреймворк
-   **Django REST Framework** — Сериализация и API endpoints
-   **SQLite/PostgreSQL** — База данных
-   **Python 3.12+** — Язык программирования

### DevOps & Infrastructure
-   **Docker & Docker Compose** — Контейнеризация
-   **Nginx** — Веб-сервер и reverse proxy
-   **Linux** — ОС для production

---

## 📂 Архитектура и структура проекта

```
danial-damu-frontend/
├── 📁 backend/                 # Django REST API
│   ├── config/                 # Настройки Django проекта
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── images/                 # Приложение для управления изображениями
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── migrations/
│   ├── manage.py
│   ├── requirements.txt        # Python зависимости
│   ├── Dockerfile
│   └── entrypoint.sh
│
├── 📁 nginx/                   # Конфигурация Nginx
│   └── default.conf
│
├── 📁 src/                     # React фронтенд
│   ├── api/
│   │   └── axios.js            # Настройки HTTP клиента
│   ├── locales/                # Файлы локализации
│   │   ├── kk/common.json      # Казахский
│   │   └── ru/common.json      # Русский
│   ├── modules/                # Модули страниц
│   │   ├── admin/
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminImages.jsx
│   │   ├── home/
│   │   │   ├── Home.jsx
│   │   │   ├── HeroSlider.jsx
│   │   │   ├── Advantages.jsx
│   │   │   └── Promotions.jsx
│   │   └── info/
│   │       ├── About.jsx
│   │       ├── Contacts.jsx
│   │       ├── Partners.jsx
│   │       ├── Supermarkets.jsx
│   │       └── Vacancies.jsx
│   ├── shared/                 # Переиспользуемые компоненты
│   │   └── layout/
│   │       ├── Header.jsx
│   │       ├── Footer.jsx
│   │       └── ProtectedRoute.jsx
│   ├── App.jsx                 # Главный компонент с React Router
│   ├── i18n.js                 # Конфигурация i18next
│   ├── main.jsx                # Точка входа React
│   └── index.css               # Глобальные стили + Tailwind
│
├── 📁 public/                  # Статические ресурсы
│   └── logo.png                # Логотип и favicon
│
├── docker-compose.yml          # Оркестрация контейнеров
├── Dockerfile                  # Сборка фронтенд контейнера
├── vite.config.js              # Конфигурация Vite
├── tailwind.config.js          # Tailwind CSS расширение
├── postcss.config.js           # PostCSS конфигурация
├── package.json                # Node.js зависимости
├── index.html                  # HTML шаблон
└── README.md
```

---

## ⚡ Ключевые особенности

### 🌐 Полная мультиязычность
Весь текстовый контент загружается из JSON файлов через `react-i18next`. Поддержка казахского (по умолчанию) и русского языков. Нет захардкоженного текста в коде.

### 🎨 Адаптивный дизайн
Полная кроссплатформенность: от мобильных устройств до десктопов. Карусели и слайдеры адаптируются под размер экрана с авто-прокруткой.

### 🚀 Производительность
- Использование **Vite** для молниеносной разработки и оптимальной сборки
- **Framer Motion** для 60 FPS анимаций
- **Lazy loading** компонентов с React Router
- **Skeleton Loaders** для лучшего UX при загрузке данных

### 🔐 Защищённые маршруты
`ProtectedRoute` компонент предотвращает доступ неавторизованных пользователей к админ-панели.

### 🔄 API интеграция
Единая конфигурация Axios с интерцепторами для:
- Автоматического добавления токенов авторизации
- Обработки ошибок
- Retry логики

---

## 🛠️ Запуск проекта

Требования:
- **Node.js 18+** для фронтенда
- **Python 3.12+** для бэкенда
- **Docker & Docker Compose** для контейнеризации

### ⚡ Быстрый старт (Docker Compose)

Самый простой способ запустить всё приложение:

```bash
docker compose up --build -d
```

Приложение будет доступно:
- 🌐 Фронтенд: [http://localhost/](http://localhost/)
- 🔌 API: [http://localhost/api/](http://localhost/api/)
- 👨‍💼 Админка Django: [http://localhost/admin/](http://localhost/admin/)

#### Создание администратора (в Docker):
```bash
docker compose exec backend python manage.py createsuperuser
```

### 📦 Локальная разработка (без Docker)

#### Фронтенд (React):
```bash
# Установка зависимостей
npm install

# Разработка с HMR
npm run dev

# Production сборка
npm run build
```

Фронтенд откроется на `http://localhost:5173`

#### Бэкенд (Django):
```bash
cd backend

# Создание виртуального окружения
python -m venv venv
source venv/bin/activate  # На Windows: venv\Scripts\activate

# Установка зависимостей
pip install -r requirements.txt

# Миграции БД
python manage.py migrate

# Создание администратора
python manage.py createsuperuser

# Запуск сервера
python manage.py runserver
```

Бэкенд будет доступен на `http://localhost:8000`

---

## � Переменные окружения

### Frontend (`.env` в корне)
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_TITLE=DANIYAL DAMU
```

### Backend (`.env` в `backend/`)
```env
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

---

## 📋 Доступные npm скрипты

```bash
npm run dev          # Запуск dev сервера с HMR
npm run build        # Production сборка
npm run preview      # Предпросмотр production сборки
npm run lint         # Проверка синтаксиса (если настроен ESLint)
```

---

## 🐳 Docker структура

- **Frontend контейнер** — Nginx + SPA из Vite
- **Backend контейнер** — Gunicorn + Django
- **Nginx контейнер** — Reverse proxy для всех сервисов

Проксирование:
- `/` → Frontend (React SPA)
- `/api/*` → Backend Django API
- `/admin/*` → Django админка
- `/static/*` → Статические файлы Django

---

## 🎯 Разработка

### Добавление нового модуля страницы

1. Создайте папку в `src/modules/имя-модуля/`
2. Добавьте компоненты React
3. Зарегистрируйте маршрут в `src/App.jsx`
4. Добавьте переводы в `src/locales/kk/common.json` и `src/locales/ru/common.json`

### Добавление нового языка

1. Создайте папку `src/locales/код-языка/` (например, `en/`)
2. Создайте файл `common.json` с переводами
3. Обновите конфигурацию в `src/i18n.js`

### Django API разработка

1. Создайте новое приложение: `python manage.py startapp app_name`
2. Определите модели в `models.py`
3. Создайте сериализаторы в `serializers.py`
4. Добавьте представления (ViewSets) в `views.py`
5. Зарегистрируйте URL в `urls.py`
6. Создайте миграции: `python manage.py makemigrations && python manage.py migrate`

---

## 📝 Логирование и отладка

- Frontend ошибки видны в `DevTools Console`
- Backend логи: `docker compose logs backend`
- Nginx логи: `docker compose logs nginx`
Технологии
### Django Debug Toolbar (локальная разработка)
Добавьте в `settings.py`:
```python
INSTALLED_APPS += ['debug_toolbar']
MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
INTERNAL_IPS = ['127.0.0.1']
```

---

## 🚀 Развертывание

### Production с Docker Compose

```bash
docker compose -f docker-compose.yml up -d
```

### Масштабирование

Отредактируйте `docker-compose.yml` для добавления нескольких инстансов:
```yaml
services:
  backend:
    deploy:
      replicas: 3
```

### Backup БД

```bash
docker compose exec backend python manage.py dumpdata > backup.json
```

---

## 🤝 Взаимодействие Frontend ↔ Backend

### API запросы

Используйте готовый Axios инстанс:
```javascript
import api from '@/api/axios';

// GET
api.get('/api/images/').then(res => console.log(res.data));

// POST
api.post('/api/images/', { name: 'shop', image: file });

// PUT/PATCH
api.patch('/api/images/1/', { name: 'updated-shop' });

// DELETE
api.delete('/api/images/1/');
```

### Аутентификация

Токены сохраняются в `localStorage` и добавляются в заголовок `Authorization: Bearer <token>`.

---

## 📊 Структура компонентов

### Страницы (modules)
Находятся в `src/modules/` и представляют собой полные страницы приложения.

### Компоненты (shared)
Переиспользуемые компоненты в `src/shared/` — Header, Footer, ProtectedRoute и т.д.

### API слой
Все запросы идут через `src/api/axios.js` с централизованной обработкой ошибок.

---

## 🐛 Известные проблемы и решения

### Проблема: CORS ошибки
**Решение:** Убедитесь, что в `settings.py` Django указаны правильные `ALLOWED_HOSTS` и `CORS_ALLOWED_ORIGINS`.

### Проблема: Изображения не загружаются
**Решение:** Проверьте, что путь к логотипу — `public/logo.png` и адрес API в `.env` правилен.

### Проблема: HMR не работает в Docker
**Решение:** Добавьте в `vite.config.js`:
```javascript
server: {
  middlewareMode: true,
  watch: { usePolling: true }
}
```

---

## 📄 Лицензия

Все права на визуальный дизайн и концепцию принадлежат **ТОО "DANIYAL DAMU"**.

---

## 👥 Команда

- **Frontend Lead**: React, Vite, Tailwind CSS, i18n
- **Backend Lead**: Django, REST API, БД
- **DevOps**: Docker, Nginx, CI/CD

---

## 📞 Контакты и поддержка

Для вопросов и найденных ошибок создавайте issues в репозитории.

**Последнее обновление:** Май 2026
