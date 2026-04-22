# Рекомендации по подготовке Backend к Render

## Обновления requirements.txt

Убедитесь, что в `backend/requirements.txt` включены:

```
Django==4.2.0
djangorestframework==3.14.0
django-cors-headers==4.0.0
python-dotenv==1.0.0
gunicorn==21.2.0
psycopg2-binary==2.9.0  # для PostgreSQL
whitenoise==6.5.0  # для статических файлов
```

## Обновления settings.py

```python
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# SECURITY
DEBUG = os.getenv('DEBUG', 'False') == 'True'
SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key')

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# CORS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'images',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Для статических файлов на Render
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = os.getenv(
    'CORS_ALLOWED_ORIGINS',
    'http://localhost:3000'
).split(',')

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Для PostgreSQL (рекомендуется для production):
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': os.getenv('DB_NAME'),
#         'USER': os.getenv('DB_USER'),
#         'PASSWORD': os.getenv('DB_PASSWORD'),
#         'HOST': os.getenv('DB_HOST'),
#         'PORT': os.getenv('DB_PORT', '5432'),
#     }
# }

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Whitenoise optimization
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

## Создание .env для Backend

```bash
# backend/.env
DEBUG=False
SECRET_KEY=your-very-secret-key-change-this
ALLOWED_HOSTS=your-backend.onrender.com,localhost
CORS_ALLOWED_ORIGINS=https://your-frontend.onrender.com,http://localhost:3000
```

## Команды для миграций

```bash
# Локально перед деплоем
python manage.py makemigrations
python manage.py migrate

# На Render (в Build Command):
python manage.py migrate

# Создание superuser (если нужен через shell):
python manage.py createsuperuser
```

## wsgi.py обновления (если нужны)

```python
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = get_wsgi_application()
```

## urls.py для статических файлов

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('images.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

## Проверка перед деплоем

```bash
# Backend здоровье-чек
python manage.py check
python manage.py check --deploy

# Локальный тест
python manage.py runserver 0.0.0.0:8000
```

## Переменные окружения для Render (Backend)

Добавьте в Render Environment:

```
DEBUG=False
SECRET_KEY=generate-a-random-key-here
ALLOWED_HOSTS=your-backend-service.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend-service.onrender.com
DATABASE_URL=postgresql://...  (если используете PostgreSQL)
```

## Полезные ссылки

- Django Settings для Production: https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/
- Gunicorn docs: https://gunicorn.org/
- WhiteNoise (static files): http://whitenoise.evans.io/
