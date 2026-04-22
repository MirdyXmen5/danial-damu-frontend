# 🐛 Отладка Admin панели - Чек-лист

## 🔴 Если видите белую страницу админа

Выполните проверки в этом порядке:

### Шаг 1: Откройте DevTools

```
Нажмите F12 на админ странице
Перейдите на вкладку Console
Ищите красные сообщения об ошибках
```

### Шаг 2: Проверьте API URL

В Console введите:
```javascript
import.meta.env.VITE_API_URL
```

Должно вывести: `https://ваш-backend.onrender.com` (или похоже)

❌ Если видите `undefined` или `http://localhost:8000` → Проблема!

**Решение:**
1. На Render Dashboard → Frontend Service → Environment
2. Проверьте `VITE_API_URL` = полный URL backend
3. Нажмите Save (переdeployment)

### Шаг 3: Посмотрите Network запросы

1. В DevTools перейдите на **Network**
2. Обновите страницу (F5)
3. Ищите запросы которые начинаются с вашего backend URL
4. Кликните на запрос и посмотрите **Response**

**Ищите:**
- ✅ `200 OK` → Всё хорошо
- ❌ `404 Not Found` → Эндпоинт не существует на backend
- ❌ `401 Unauthorized` → Токен невалиден
- ❌ `403 Forbidden` → CORS ошибка или недостаточно прав
- ❌ `No response/timeout` → Backend не доступен

### Шаг 4: Проверьте CORS

Если видите CORS ошибку в Console:
```
Access to XMLHttpRequest at 'https://backend...' 
from origin 'https://frontend...' has been blocked by CORS policy
```

**Решение (Backend):**
1. На Render Dashboard → Backend Service → Environment
2. Проверьте `CORS_ALLOWED_ORIGINS`
3. Должно содержать точный URL frontend без слэша в конце
4. Пример: `https://danial-damu-frontend.onrender.com`
5. Нажмите Save

---

## 🟡 Если логин не работает

### Проверка 1: Правильный ли backend URL?

В Console:
```javascript
console.log(import.meta.env.VITE_API_URL)
// Должно вывести ваш backend URL
```

### Проверка 2: Есть ли ошибка в Network?

1. Network → введите credentials → нажмите Войти
2. Ищите запрос `api/token/`
3. **Проверьте:**
   - `200` → Но не заходит? → Ошибка в JS коде
   - `404` → Backend URL неправильный
   - `401` → Логин/пароль неправильный
   - `403` → CORS или другая безопасность

### Проверка 3: Есть ли токены в localStorage?

В Console:
```javascript
localStorage.getItem('access')  // Должен быть long string
localStorage.getItem('refresh') // Должен быть long string
```

❌ Если оба `null` → Токены не сохранились

---

## 🟠 Если просмотр изображений не работает

### Проверка 1: Видите ли вы Error message на странице?

- ✅ Да → Прочитайте error message
- ❌ Нет → Идите на Проверку 2

### Проверка 2: Network запрос к `api/images/`

1. Network → обновите страницу
2. Ищите запрос `api/images/`
3. **Проверьте:**
   - `200` → Но нет изображений? → Может быть в backend нет данных
   - `404` → Backend URL или эндпоинт неправильный
   - `401` → Токен expired, нужно переloginиться

### Проверка 3: Response JSON структура

Network → `api/images/` → Preview/Response

Должно быть похоже на:
```json
[
  {
    "id": 1,
    "image": "https://...",
    "title": "...",
    "category": "hero"
  },
  ...
]
```

или

```json
{
  "results": [
    {...},
    {...}
  ]
}
```

❌ Если структура другая → Backend возвращает не то

---

## 🟢 Если загрузка изображений не работает

### Проверка 1: Есть ли error message?

На странице админа должна быть error область красного цвета.

**Если есть:**
- "Ошибка при получении списка" → Проблема с загрузкой images
- "Ошибка загрузки файла" → Проблема с upload эндпоинтом
- Другое → Прочитайте текст ошибки

### Проверка 2: Network запрос POST к `api/images/`

1. Network → выберите файл, нажмите Upload
2. Ищите запрос `POST api/images/`
3. **Проверьте:**
   - `201 Created` → Успешно! Но может не отобразиться → обновите страницу
   - `400 Bad Request` → Неправильные данные (смотрите Response)
   - `413 Payload Too Large` → Файл слишком большой
   - `401/403` → Авторизация или права

### Проверка 3: Request Payload

Network → `POST api/images/` → Request tab

Должны быть:
- `image` (файл)
- `title` (текст)
- `category` (hero или promo)

---

## 📋 Быстрая диагностика

Скопируйте это в Console и выполните:

```javascript
// 1. Проверка env
console.log('API URL:', import.meta.env.VITE_API_URL);

// 2. Проверка токенов
console.log('Access token:', localStorage.getItem('access') ? '✅ есть' : '❌ нет');
console.log('Refresh token:', localStorage.getItem('refresh') ? '✅ есть' : '❌ нет');

// 3. Тестовый запрос
const api = await import('/src/api/axios.js');
api.default.get('api/images/')
  .then(r => console.log('✅ Images API работает:', r.data))
  .catch(e => console.log('❌ Images API ошибка:', e.response?.status, e.message));
```

---

## 🔗 Полезные логи

### Backend логи (если может доступ)

```bash
# На Render Dashboard → Backend Service → Logs
# Смотрите Runtime Logs (не Build Logs)

# Ищите:
# - 401 Unauthorized - проблема с токеном
# - CORS ошибки
# - Database ошибки
```

### Frontend логи

```bash
# DevTools → Console
# Ищите красные сообщения
# Ищите сообщения которые вывел сам код (console.error)
```

---

## ✅ Если всё работает

```javascript
// В Console должны быть:
import.meta.env.VITE_API_URL     // ✅ вывод
localStorage.getItem('access')   // ✅ не null
api.get('api/images/')           // ✅ returns 200
```

И на странице:
- ✅ Видны изображения
- ✅ Можете загружать
- ✅ Можете удалять
- ✅ Нет красных ошибок

---

## 💬 Если ничего из выше не помогло

1. **Откройте DevTools → Console**
2. **Скопируйте все ошибки (красный текст)**
3. **Посмотрите в Render Dashboard → Logs**
4. **Сравните с этим документом**

**Самая частая проблема:** Неправильный `VITE_API_URL` на Render

**Второй частый:** CORS ошибки в backend settings

---

*Этот документ поможет найти и исправить 95% проблем с админ панелью!* 🎯
