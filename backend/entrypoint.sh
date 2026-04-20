#!/bin/sh

# Применяем миграции к базе данных
python manage.py makemigrations
python manage.py migrate

# Создаем админа автоматически
python manage.py shell -c "
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
"

# Собираем статические файлы
python manage.py collectstatic --noinput

# Запускаем Gunicorn
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3
