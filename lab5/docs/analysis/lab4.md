# Аналіз лабораторної роботи 4

## Порівняння з лабораторною роботою 3

У лабораторній роботі 3 проект був побудований за принципом CQRS (Command Query Responsibility Segregation).

Commands та Queries були розділені, а логіка виконувалась послідовно:

```text
Controller → Handler → Domain → Repository
```

Після виконання основної операції система одразу завершувала роботу без додаткових побічних процесів.

У лабораторній роботі 4 архітектура була розширена механізмами синхронної та асинхронної комунікації між компонентами системи.

Було додано:
- synchronous communication
- asynchronous communication
- Event Bus
- events
- listeners
- notification component

Тепер після створення задачі система може виконувати додаткові побічні операції:
- notification
- event processing
- listener handling

---

# Які побічні операції були виділені

У проекті був створений окремий Notification компонент.

Використані файли:

```text
src/notifications/NotificationService.js
src/notifications/TaskCreatedListener.js
```

Notification компонент відповідає за обробку повідомлень після створення задачі.

Також був створений:

```text
src/event-bus/EventBus.js
```

який відповідає за доставку подій між компонентами системи.

Було створено event:

```text
src/events/TaskCreatedEvent.js
```

Подія містить інформацію про створену задачу та передається через Event Bus.

---

# Синхронна комунікація

У синхронному варіанті `CreateTaskHandler` напряму викликає notification service після створення задачі.

Схема роботи:

```text
CreateTaskHandler
        ↓
NotificationService
```

Приклад виклику:

```js
this.notificationService.send(createdTask);
```

## Переваги synchronous communication

- проста реалізація
- легко тестувати
- зрозумілий flow виконання
- усі операції виконуються послідовно

## Недоліки synchronous communication

- сильна зв’язаність компонентів
- якщо notification service падає — основна операція також завершується помилкою
- API відповідає повільніше через додаткову операцію
- складніше масштабувати систему

У проекті synchronous communication реалізована у:

```text
src/application/command-handlers/CreateTaskHandler.js
```

---

# Асинхронна комунікація

У асинхронному варіанті handler більше не викликає notification service напряму.

Після створення task публікується event:

```js
this.eventBus.publish(
  'TaskCreated',
  new TaskCreatedEvent(createdTask)
);
```

Listener окремо підписується на подію:

```js
eventBus.subscribe(
  'TaskCreated',
  event => listener.handle(event)
);
```

Схема роботи:

```text
CreateTaskHandler
        ↓
     EventBus
        ↓
TaskCreatedListener
        ↓
NotificationService
```

## Переваги asynchronous communication

- менша зв’язаність між компонентами
- основна операція не залежить від listener
- швидша відповідь API
- простіше масштабувати систему
- можна додавати нові listeners без зміни handler

## Недоліки asynchronous communication

- складніше реалізувати
- складніше тестувати
- важче відслідковувати flow виконання
- можливі проблеми з повторною доставкою подій
- система стає складнішою

У проекті асинхронна комунікація була реалізована через in-process Event Bus.

---

# Порівняння synchronous та asynchronous підходів

## Час відповіді API

У synchronous варіанті API очікує завершення notification service.

У asynchronous варіанті API завершує основну операцію одразу після publish event, тому відповідь API швидша.

---

## Поведінка при збоях

У synchronous communication помилка notification service може зламати створення task.

У asynchronous communication listener працює незалежно, тому основна операція продовжує виконуватись навіть при помилці listener.

---

## Зв’язаність компонентів

Synchronous communication створює сильну залежність між handler та notification service.

Asynchronous communication використовує Event Bus, тому handler не знає про конкретну реалізацію listener.

---

## Складність реалізації та тестування

Synchronous варіант простіший у реалізації та тестуванні.

Asynchronous communication потребує:
- events
- listeners
- event bus
- subscribe механізму

Тому архітектура стає складнішою.

---

# Який підхід краще для production системи

Для production системи більш гнучким є asynchronous підхід.

Причини:
- компоненти менш залежні
- систему простіше масштабувати
- можна додавати нові listeners без зміни основного handler
- краще підходить для notification, analytics, audit логування
- легше інтегрувати зовнішні сервіси

Проте synchronous communication краще підходить для невеликих проектів та простих операцій.

---

# Повторна доставка подій та idempotency

Якщо одна й та сама подія буде доставлена двічі, listener може повторно виконати одну й ту саму операцію.

Наприклад:
- повторно відправити notification
- повторно записати audit log

У нашому проекті listeners не є повністю idempotent, тому при повторній доставці події можливе повторне виконання операції.

У production системах для вирішення цієї проблеми використовують:
- event id
- deduplication
- message tracking
- idempotent handlers

---

## Розподіл роботи

### Євтєєва Вероніка

Виконала:
- створення структури lab4
- Event Bus
- TaskCreatedEvent
- app.js configuration
- subscribe logic
- integration project setup
- analysis lab4
- git merge та pull requests

---

### Сахнюк Юлія

Виконала:
- створення структури lab4
- synchronous communication
- NotificationService
- asynchronous communication
- TaskCreatedListener
- command handler updates
- tests для sync та async communication
- communication fixes
- git merge та pull requests

---

# Висновок

У лабораторній роботі 4 проект був розширений механізмами синхронної та асинхронної комунікації між компонентами.

Основною зміною порівняно з лабораторною роботою 3 стало впровадження:
- Event Bus
- events
- listeners
- notification component

Система стала більш гнучкою та ближчою до реальних production архітектур.

Асинхронний підхід дозволяє зменшити зв’язаність компонентів та спрощує масштабування системи, але робить архітектуру складнішою та потребує додаткової логіки для обробки подій.