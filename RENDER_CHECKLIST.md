# Render Deployment Checklist

## ✅ Локальная подготовка (Before Push)

- [ ] Frontend `npm run build` - успешная сборка
- [ ] Frontend `npm run lint` - нет ошибок
- [ ] Backend `python manage.py check --deploy` - нет проблем
- [ ] .env файлы созданы (.env.production, .env.development)
- [ ] Git: `git add .` && `git commit` && `git push`

## 🚀 Render: Setup Backend

1. [ ] Создать Web Service на https://render.com
2. [ ] Выбрать Git репозиторий
3. [ ] **Name**: `danial-damu-backend`
4. [ ] **Environment**: Python 3
5. [ ] **Build Command**:
   ```
   pip install -r backend/requirements.txt && python backend/manage.py migrate
   ```
6. [ ] **Start Command**:
   ```
   gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
   ```
7. [ ] Environment Variables:
   ```
   DEBUG=False
   SECRET_KEY=<your-generated-key>
   ALLOWED_HOSTS=<backend-url>.onrender.com
   CORS_ALLOWED_ORIGINS=https://<frontend-url>.onrender.com
   ```
8. [ ] Deploy и скопировать URL: `https://<your-backend>.onrender.com`

## 🎨 Render: Setup Frontend

1. [ ] Создать Web Service на https://render.com
2. [ ] Выбрать **тот же** Git репозиторий
3. [ ] **Name**: `danial-damu-frontend`
4. [ ] **Environment**: Node
5. [ ] **Build Command**:
   ```
   npm install && npm run build
   ```
6. [ ] **Start Command**:
   ```
   npm start
   ```
7. [ ] **Root Directory**: `frontend` (если нужно)
8. [ ] Environment Variables:
   ```
   VITE_API_URL=https://<your-backend>.onrender.com
   NODE_ENV=production
   ```
9. [ ] Enable Auto-Deploy: YES
10. [ ] Deploy и получить URL: `https://<your-frontend>.onrender.com`

## 🔗 Post-Deployment Checks

- [ ] Frontend загружается: `https://<your-frontend>.onrender.com`
- [ ] Логотип и содержимое видно
- [ ] Навигация работает (Home, About, Contacts)
- [ ] Admin login доступен: `/panel/login`
- [ ] API запросы успешны (проверить DevTools → Network)
- [ ] Нет CORS ошибок в Console

## 🐛 If Something Breaks

| Проблема | Решение |
|----------|---------|
| White screen | Проверить Console в DevTools, посмотреть Render Logs |
| CORS ошибка | Обновить `CORS_ALLOWED_ORIGINS` в Backend env vars |
| API 404 | Убедиться что `VITE_API_URL` правильный |
| Build fails | Проверить logs: Services → service name → Logs |
| Static files missing | Убедиться что `npm run build` работает локально |

## 📝 Environment Variables Template

### Backend (.env или Render env vars)
```
DEBUG=False
SECRET_KEY=<generate-strong-key>
ALLOWED_HOSTS=<backend-url>.onrender.com
CORS_ALLOWED_ORIGINS=https://<frontend-url>.onrender.com
```

### Frontend (.env или Render env vars)
```
VITE_API_URL=https://<backend-url>.onrender.com
NODE_ENV=production
```

## 🔄 Updating After Deploy

1. Сделать изменения локально
2. `git push` в главную ветку
3. Render автоматически переdeployит (если Auto-Deploy включен)
4. Проверить статус в Render Dashboard

## 💡 Pro Tips

- Сохранять сильные SECRET_KEY (генерировать новые для каждого сервиса)
- Использовать разные DB для разработки и production
- Регулярно смотреть логи: Render → Services → Logs
- Тестировать локально перед push: `npm start` + `python manage.py runserver`

## 📚 Resources

- [Render Docs](https://render.com/docs)
- [Django Deployment](https://docs.djangoproject.com/en/4.2/howto/deployment/)
- [Full Deployment Guide](./RENDER_DEPLOYMENT.md)
