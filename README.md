# DANIYAL DAMU — Корпоративный Frontend

Современный фронтенд для веб-корпоративного сайта крупнейшей сети супермаркетов **«DANIYAL DAMU»**. Разработано с фокусом на UX/UI, кроссплатформенную адаптивность и строгую компонентную архитектуру.

## 🚀 Технологический стек

-   **React 18** — Functional Components & Hooks
-   **Vite** — Быстрая сборка и HMR в режиме разработки
-   **Tailwind CSS** — Мощная система стилизации с кастомными бренда-цветами
-   **Framer Motion** — Плавные микро- и макро-анимации компонентов (карусели, карточки, бургер-меню)
-   **React Router v6** — Клиентская маршрутизация
-   **i18next + react-i18next** — Полная мультиязычность для казахского (`kk` - по умолчанию) и русского (`ru`) языков
-   **Axios** — HTTP-клиент с настроенным инстансом для взаимодействия к бэкенду
-   **Lucide React** — Иконки в едином стиле

---

## 📂 Архитектура и структура проекта

Проект четко разделяет переиспользуемые UI/UX компоненты, конфигурации сборки и локализацию:

```
danial-damu/
├── public/                 # Статические ресурсы (игнорируются бандлером Vite)
│   ├── logo.png            # Логотип сайта и favicon
│   └── locales/            # Файлы локализации (.json)
│       ├── kk/common.json
│       └── ru/common.json
├── src/
│   ├── api/                # Инстанс Axios и настройки API-запросов
│   ├── components/         # Многоразовые UI компоненты
│   │   ├── home/           # Слайдеры, карточки преимуществ и слайдер акций
│   │   └── layout/         # Header, Footer и навигация сайта
│   ├── pages/              # Главные страницы (Home, About, Contacts, Vacancies и т.д.)
│   ├── App.jsx             # Точка входа в React Router
│   ├── main.jsx            # Инициализация React DOM
│   ├── i18n.js             # Конфигурация i18next
│   └── index.css           # Глобальные стили + Tailwind директивы
├── tailwind.config.js      # Брендовые цвета `brand.*` и расширение Tailwind
├── vite.config.js          # Конфигурация сборщика
└── package.json            # Зависимости и скрипты
```

---

## ⚡ Особенности реализации

### 🌐 Мультиязычность
Никакого захардкоженного текста в коде проекта нет. Весь текстовый контент берется из `.json` файлов через функцию-хук `useTranslation()` из пакета `react-i18next`. По умолчанию используется казахский язык.

### 💨 Производительность и Анимации
Изображения, карусель акций и hero-баннеры используют адаптивные слайдеры, собранные вручную через **Framer Motion + CSS Transforms**, что гарантирует плавные `60 FPS` анимации. На мобильных устройствах карусели автоматически меняют количество элементов, подстраиваясь под экран, с авто-прокруткой.

### 🦺 Обработка данных (API)
В `src/api/axios.js` реализован паттерн интерцепторов для запросов к бэкенду.  Для загружаемых модулей (как HeroSlider и Promotions) вмонтированы `Skeleton Loaders` (анимации-заглушки загрузки).

---

## 🛠️ Запуск проекта

Убедитесь, что у вас установлен [Node.js](https://nodejs.org/) для frontend и [Python 3.12+](https://www.python.org/) для backend.

### 🔌 Запуск всего проекта через Docker (Быстрый старт)

Самый рекомендуемый и простой способ запустить проект для продакшена или локального тестирования:

1. Убедитесь, что у вас установлен **Docker** и **Docker Compose**.
2. В корневой директории проекта просто выполните:
   ```bash
   docker compose up --build -d
   ```
3. Готово! Фронтенд (React) теперь доступен по адресу: `http://localhost/` (Порт 80)
4. Бэкенд и админка (Django) проксируются автоматически (`/api` и `/admin`).
5. Чтобы создать администратора, подключитесь к работающему контейнеру бэкенда:
   ```bash
   docker compose exec backend python manage.py createsuperuser
   ```

*Альтернативный (ручной) способ запуска:*
Для разработки вы все еще можете использовать `npm run dev` для React и `python manage.py runserver` для Django, предварительно установив зависимости.

---

## 📌 Важное замечание по ассетам
Изначально логотип сайта находился по пути `img/logo.png`. Для корректной работы бандлера Vite (и чтобы он работал как `favicon` в заголовке вкладки браузера), файл **`logo.png` обязательно должен находиться в папке `public`** в корне проекта вместе с файлами языковой локализации.


## 🌍 Развертывание на Render

Для развертывания приложения на облачном хостинге **Render.com** используются специально подготовленные конфиги.

### Быстрый старт развертывания:

1. **Убедитесь, что все изменения загружены в GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for render deployment"
   git push origin main
   ```

2. **Развертывание Backend:**
   - На render.com создайте Web Service
   - Подключите GitHub репозиторий
   - Build Command: `pip install -r backend/requirements.txt && python backend/manage.py migrate`
   - Start Command: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`
   - Установите переменные окружения (DEBUG, SECRET_KEY, ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS)

3. **Развертывание Frontend:**
   - Создайте второй Web Service (Node)
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Установите VITE_API_URL = https://ваш-backend.onrender.com

4. **Обновление CORS в Backend:**
   - В settings.py добавьте URL вашего frontend в CORS_ALLOWED_ORIGINS

### 📚 Подробные инструкции:

- **[RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)** — Полная инструкция по развертыванию
- **[RENDER_CHECKLIST.md](./RENDER_CHECKLIST.md)** — Чек-лист перед и после развертывания
- **[BACKEND_RENDER_SETUP.md](./BACKEND_RENDER_SETUP.md)** — Специфика настройки Django для Render

### 🔑 Основные файлы конфигурации:

- `.env.production` — Переменные для production (API URL, etc.)
- `.env.development` — Переменные для разработки
- `render.yaml` — Конфигурация для Render
- `vite.config.js` — Обновлена для production сборки

---
