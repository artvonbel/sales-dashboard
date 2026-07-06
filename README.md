```markdown
# 📊 Sales Dashboard — интерактивный дашборд продаж

[![Netlify Status](https://api.netlify.com/api/v1/badges/ваш-badge-id/deploy-status)](https://sales-dashboard-artie.netlify.app)
[![Render](https://img.shields.io/badge/Render-API-46E3B7)](https://sales-dashboard-gzxs.onrender.com)

**Живой демо-сайт:** [sales-dashboard-artie.netlify.app](https://sales-dashboard-artie.netlify.app)

---

## 📌 О проекте

**Sales Dashboard** — это полнофункциональное веб-приложение для визуализации и анализа данных о продажах. Проект реализован в рамках технического задания и демонстрирует навыки работы с React, визуализацией данных, фильтрацией, пагинацией, а также деплоем на современные платформы.

### 🔥 Основные возможности

- **Интерактивные графики** — линейные, столбчатые и круговая диаграмма (библиотека Recharts).
- **Умные фильтры** — по дате, категории, товару и диапазону суммы.
- **Сортировка** — клик по заголовку таблицы сортирует данные по возрастанию/убыванию.
- **Пагинация** — по 10 записей на страницу с навигацией.
- **CRUD-операции** — добавление и удаление записей через API.
- **Экспорт в CSV** — выгрузка отфильтрованных данных.
- **Тёмная тема** — переключается по кнопке и сохраняется в localStorage.
- **Адаптивный дизайн** — корректно отображается на всех устройствах.
- **Бэкенд на JSON Server** — развёрнут на Render.com.

---

## 🧰 Технологический стек

### Фронтенд
- **React 18** — компонентный подход
- **Vite** — быстрая сборка
- **Recharts** — визуализация данных
- **date-fns** — работа с датами
- **Tailwind CSS** — стилизация
- **react-hot-toast** — уведомления

### Бэкенд
- **JSON Server** — фейковое REST API
- **Axios** — HTTP-запросы

### Деплой
- **Render.com** — бэкенд
- **Netlify** — фронтенд
- **GitHub** — хранение кода

---

## 🚀 Быстрый старт

### Клонирование репозитория

```bash
git clone https://github.com/artvonbel/sales-dashboard.git
cd sales-dashboard
```

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`.

### Запуск бэкенда (локально)

```bash
npm run server
```

JSON Server запустится на порту 5000: `http://localhost:5000/sales`.

### Сборка для продакшена

```bash
npm run build
```

Собранные файлы появятся в папке `dist`.

---

## 📂 Структура проекта

```
sales-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── AddSaleForm.jsx
│   │   ├── Charts.jsx
│   │   ├── Filters.jsx
│   │   └── SalesTable.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── services/
│   │   └── salesService.js
│   ├── utils/
│   │   ├── exportCSV.js
│   │   └── generateMockData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── db.json
├── server.cjs
├── package.json
├── .env
└── README.md
```

---

## 🌐 Деплой

### Бэкенд (Render)

1. Создай Web Service на Render.
2. Подключи репозиторий.
3. В настройках укажи:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Добавь переменную `PORT` (необязательно).

### Фронтенд (Netlify)

1. Импортируй репозиторий на Netlify.
2. Настрой:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Добавь переменную окружения:
   - `VITE_API_URL` = `https://твой-бэкенд.onrender.com/sales`

---

## 📸 Скриншоты

| Светлая тема | Тёмная тема |
|--------------|-------------|
| (добавь скриншот) | (добавь скриншот) |

---

## 🧪 Тестирование

Проект протестирован вручную. Проверены:
- Загрузка данных с сервера.
- Добавление и удаление записей.
- Фильтрация, сортировка, пагинация.
- Переключение темы.
- Экспорт CSV.

---

## 🧠 Что можно улучшить

- Подключение реальной базы данных (PostgreSQL, MongoDB).
- Добавление авторизации (JWT).
- Редактирование записей.
- Импорт CSV.
- Unit-тесты (Jest, React Testing Library).

---

## 📄 Лицензия

MIT © [Артём Бел](https://github.com/artvonbel)

---

## 🙏 Благодарности

- [JSON Server](https://github.com/typicode/json-server) — за быстрый REST API.
- [Recharts](https://recharts.org) — за красивые графики.
- [Tailwind CSS](https://tailwindcss.com) — за удобную стилизацию.
- [Render](https://render.com) и [Netlify](https://netlify.com) — за бесплатный хостинг.
```