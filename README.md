
# Kastom Reviews

Kastom Reviews — это веб-приложение для оценки сотрудников. Клиенты могут оставить отзыв о сотруднике, а администратор — просматривать и управлять сотрудниками и отзывами.

## ✨ Возможности

- Оставление отзыва с рейтингом и текстом.
- Ограничение по одному отзыву на сотрудника с одного устройства.
- Панель администратора: создание, редактирование, удаление сотрудников.
- Подсчет среднего рейтинга сотрудника.
- Загрузка и хранение изображений через Cloudinary.
- Защищенные маршруты с помощью JWT.
- Ограничение отзывов через rate limiting.
- Отображение всплывающих уведомлений через `react-hot-toast`.

## ⚙️ Технологии

### Клиентская часть (Vite + React)

- `react`
- `react-router-dom`
- `axios`
- `tailwindcss`
- `react-hot-toast`
- `react-icons`

### Серверная часть (Express)

- `express`
- `mongoose`
- `jsonwebtoken`
- `multer`, `multer-storage-cloudinary`
- `cloudinary`
- `dotenv`
- `cors`

## 📁 Структура

```
kastom-reviews/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   ├── index.html
│   └── vite.config.js
└── server/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── server.js
```

## 🚀 Деплой

- Клиент: [Vercel](https://vercel.com/)
- Сервер: [Render](https://render.com/) (с учетом "sleep mode" после простоя)

## 🔒 Защита от спама

- Ограничение на 1 отзыв на сотрудника с одного устройства (`localStorage`)
- Rate limiter — один POST отзыв в 12 часов на IP.

## 🐳 Docker (в перспективе)

Можно использовать Docker для локального развертывания и хостинга:
- контейнеризация backend и frontend;
- удобный деплой на VPS или облаке.

---

🧑‍💻 Разработчик: Ilya-hb  
📁 Репозиторий: [GitHub](https://github.com/Ilya-hb/kastom-reviews)

<img width="1772" height="1240" alt="аа (150 x 105 2" src="https://github.com/user-attachments/assets/13c48970-c982-46fd-9a12-fc102d2aafd2" />



