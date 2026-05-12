Лабораторна робота №1 — CRUD API

Мета роботи
Отримати базову реалізацію REST API.
Проект є baseline для подальшого рефакторингу.

Домен
Система керування задачами (Task Manager)

Автори
Євтєєва Вероніка — юзкейси, тести, документація
Сахнюк Юля — backend, API, авторизація

Технології
Node.js
Express.js
JWT (jsonwebtoken)
Jest + Supertest

Запуск проекту
1. Встановлення залежностей
npm install

2. Запуск сервера
npx nodemon src/server.js

Сервер запускається на:
http://localhost:3000

Запуск тестів
npm test

Авторизація
POST /auth/register

Створення користувача:

{
  "email": "test@test.com",
  "password": "123456"
}



REST API (Tasks)

POST /tasks:
Створити задачу

{
  "title": "Test task",
  "deadline": "2030-01-01"
}

GET /tasks:
Отримати всі задачі

GET /tasks/:
Отримати одну задачу

PUT /tasks/:
Оновити задачу

DELETE /tasks/:
Видалити задачу

Захист API
Всі /tasks ендпоінти потребують токен:
Authorization: Bearer <token>

Обробка помилок
Код	Опис
400	Невалідні дані
401	Не авторизований
404	Ресурс не знайдено
409	Конфлікт

Інваріанти
title не може бути пустим
deadline не може бути в минулому
задача повинна існувати для оновлення/видалення

Юзкейси
Описані у файлі - docs/use-cases.md

Тестування

Unit тести:
перевірка валідації
бізнес-логіка

Integration тести:

перевірка API
перевірка статус-кодів
перевірка авторизації

Структура проекту

task-manager/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes.js
│   ├── app.js
│   └── server.js
│
├── tests/
├── docs/
│   └── use-cases.md
│
├── package.json
└── README.md

Висновок
Було реалізовано базовий CRUD API з авторизацією та тестами.
