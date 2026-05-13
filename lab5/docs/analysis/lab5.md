# Аналіз розвитку архітектури проекту (Лабораторні роботи 1–5)

# Вступ

Під час виконання лабораторних робіт проект поступово еволюціонував від простої REST API системи до modular monolith architecture з bounded contexts, Event Bus та ACL.

Основною метою курсу було поступове ускладнення архітектури та наближення проекту до real production systems.

---

# Лабораторна робота 1 

У першій лабораторній роботі була реалізована проста Express API структура.

Було створено:
- controllers
- routes
- middleware
- app.js
- server.js

Структура була простою:

```text
Request → Controller → Response
```

Основна логіка знаходилась у controllers, тому система була легкою для розуміння, але мала сильну зв’язаність компонентів.

---

# Лабораторна робота 2

У lab2 архітектура стала більш структурованою.

Було додано:
- domain layer
- entities
- repositories
- factories
- use cases
- DTO
- infrastructure layer

Flow виконання:

```text
Controller → UseCase → Domain → Repository
```

Проект став більш maintainable та зручним для тестування.

---

# Лабораторна робота 3

У третій лабораторній роботі був реалізований CQRS підхід.

Було створено:
- commands
- queries
- command handlers
- query handlers

Write та read логіка були розділені.

Commands:

```text
Controller → Command → CommandHandler
```

Queries:

```text
Controller → Query → QueryHandler
```

CQRS покращив структуру проекту та separation of concerns, але збільшив складність архітектури.

---

# Лабораторна робота 4

У lab4 була реалізована взаємодія між компонентами системи через:
- synchronous communication
- asynchronous communication
- Event Bus
- events
- listeners

Було створено:
- NotificationService
- EventBus
- TaskCreatedEvent
- TaskCreatedListener

Синхронний підхід використовував прямий виклик notification service:

```js
this.notificationService.send(createdTask);
```

Асинхронний підхід використовував Event Bus:

```js
this.eventBus.publish(
  'TaskCreated',
  new TaskCreatedEvent(createdTask)
);
```

Lab4 показала різницю між synchronous та asynchronous architecture:
- coupling
- API response time
- scalability
- fault tolerance

---

# Лабораторна робота 5

Lab5 стала фінальним етапом розвитку архітектури проекту.

Основною задачею було перетворення системи у modular monolith architecture.

Було реалізовано:
- bounded contexts
- modular structure
- ACL
- public contracts
- analytics module
- eventual consistency
- inter-module communication

---

# Modular Structure

Проект був розділений на окремі модулі:

```text
src/modules
 ├── core
 └── analytics
```

---

# Core Module

Core module містить:
- task management
- commands
- queries
- handlers
- repositories
- business logic

Структура:

```text
core
 ├── application
 ├── domain
 ├── infrastructure
 ├── events
 ├── event-bus
 └── public
```

Core module став основним bounded context системи.

---

# Analytics Module

Analytics module був створений як окремий bounded context.

Його задача:
- отримувати events
- будувати projections
- виконувати analytics logic

Analytics module працює як:
- read-only consumer
- event subscriber

---

# ACL (Anti-Corruption Layer)

Для ізоляції analytics module був реалізований ACL.

Було створено translator:

```text
TaskAnalyticsTranslator.js
```

ACL:
- транслює external models
- ізолює analytics domain
- захищає модуль від змін core module

Це дозволяє analytics module працювати незалежно від внутрішньої структури core.

---

# Eventual Consistency

У lab5 між модулями була реалізована eventual consistency.

Core module:
- завершує business operation
- публікує event

Analytics module:
- асинхронно обробляє event
- оновлює internal state

Таким чином модулі стали менш зв’язаними.

---

# Strong Consistency та Eventual Consistency

## Strong Consistency

Використовується всередині core module:
- validation
- create task
- repository save

---

## Eventual Consistency

Використовується між:
- core module
- analytics module

через Event Bus.

---

# Переваги Modular Monolith

Lab5 показала переваги modular architecture:

- isolation між modules
- scalability
- cleaner architecture
- lower coupling
- можливість майбутнього переходу до microservices

---

# Недоліки Modular Monolith

Разом із перевагами зросла складність:
- більше abstraction
- складніші imports
- складніший debugging
- більше архітектурних рішень

---

# Ретроспектива розвитку проекту

Проект пройшов повну еволюцію:

```text
Lab1 → REST API
Lab2 → Domain Architecture
Lab3 → CQRS
Lab4 → Event-Driven Communication
Lab5 → Modular Monolith
```

Кожна лабораторна робота поступово зменшувала coupling між компонентами та робила систему більш гнучкою.

---

# Розподіл роботи — Лабораторна 5

## Євтєєва Вероніка

Виконала:
- modular monolith structure
- bounded contexts
- ACL translator
- app.js configuration
- Event Bus integration
- imports refactoring
- analysis lab5
- merge та pull requests

---

## Сахнюк Юлія

Виконала:
- move core logic into modules
- analytics module
- analytics listener
- public contracts
- modular tests
- asynchronous communication between modules
- eventual consistency implementation
- merge та pull requests

---

# Висновок

Під час виконання лабораторних робіт проект еволюціонував від простої REST API системи до modular monolith architecture.

Найважливішими архітектурними рішеннями стали:
- CQRS
- Event Bus
- asynchronous communication
- bounded contexts
- ACL
- modular architecture

Lab5 стала фінальним етапом, який показав, як будуються сучасні масштабовані системи з ізольованими модулями та event-driven communication.