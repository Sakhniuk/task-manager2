# Лабораторна робота №2
## Порівняння з лабораторною роботою №1

У лабораторній роботі №1 вся логіка знаходилась безпосередньо в контролерах. Наприклад:

- перевірка title
- перевірка deadline
- створення задачі
- збереження tasks

усе знаходилось у: `src/controllers/taskController.js`

Контролер одночасно:
- працював з HTTP
- містив бізнес-логіку
- працював зі сховищем даних

Це порушувало принцип розділення відповідальностей.

---

## Що змінилось у лабораторній №2

У лабораторній роботі №2 проект був поділений на 4 окремі шари:

- **Presentation**
- **Application**
- **Domain**
- **Infrastructure**

---

## Presentation Layer

| Lab1 | Lab2 |
|------|------|
| routes і business logic були пов’язані між собою | контролери тільки приймають HTTP request |
| | повертають HTTP response |
| | викликають use cases |

**Файли:** `src/presentation/controllers`, `src/presentation/routes`

Тепер controller не створює task напряму.

---

## Application Layer

У lab1 application layer взагалі не існувало.

У lab2 з’явились **use cases**:
- `src/application/use-cases/CreateTask.js`
- `src/application/use-cases/GetTasks.js`

Тепер orchestration логіка знаходиться окремо від HTTP. Наприклад:
- `CreateTask` відповідає за створення задачі
- `GetTasks` відповідає за отримання задач

---

## Domain Layer

У lab1 domain layer був відсутній.

У lab2 були створені:
- `Task` entity
- `DomainError`
- `TaskFactory`
- `TaskRepository` interface

**Файли:**
- `src/domain/entities/Task.js`
- `src/domain/errors/DomainError.js`
- `src/domain/factories/TaskFactory.js`
- `src/domain/repositories/TaskRepository.js`

**Перевірка інваріантів:**
- title не пустий
- deadline не в минулому

тепер знаходиться у `TaskFactory`, а не в controller.

---

## Infrastructure Layer

| Lab1 | Lab2 |
|------|------|
| масив tasks знаходився прямо в controller: `let tasks = [];` | створено InMemoryRepository |
| | реалізує інтерфейс TaskRepository |

---

## Залежності між шарами

**Lab1:**
- controller напряму працював з даними
- не було dependency separation

**Lab2:**
- Presentation залежить від Application
- Application залежить від Domain
- Infrastructure реалізує інтерфейси Domain

Domain layer не імпортує:
- Express
- HTTP
- framework code

---

## Тестування

| Lab1 | Lab2 |
|------|------|
| тести перевіряли тільки API endpoints | domain unit tests |
| `tests/example.test.js` | integration tests |

Тепер domain можна тестувати без запуску Express server.

---

## Розподіл роботи

### Євтєєва Вероніка
- Presentation layer
- Controllers
- Routes
- DTO структура
- Integration tests
- Domain tests
- `app.js` та `server.js`
- Аналіз лабораторної роботи

### Сахнюк Юлія
- Domain layer
- Domain entities
- Domain errors
- TaskFactory
- Repository interfaces
- Infrastructure layer
- InMemory repository
- Application layer
- Use cases

---

## Висновок

У результаті рефакторингу проект став більш структурованим.

**Основна відмінність від lab1 полягає у тому, що:**
- бізнес-логіка більше не знаходиться в controller
- з’явилось розділення відповідальностей
- domain став незалежним від Express та HTTP
- проект став простішим для тестування та масштабування