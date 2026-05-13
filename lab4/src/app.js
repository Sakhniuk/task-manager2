const express = require('express');

const TaskController =
require('./presentation/controllers/taskController');

const CreateTaskHandler =
require('./application/command-handlers/CreateTaskHandler');

const GetTasksHandler =
require('./application/query-handlers/GetTasksHandler');

const InMemoryTaskRepository =
require('./infrastructure/repositories/InMemoryTaskRepository');

const routes =
require('./presentation/routes/taskRoutes');

const EventBus =
require('./event-bus/EventBus');

const TaskCreatedListener =
require('./notifications/TaskCreatedListener');

const app = express();

app.use(express.json());

const repository =
new InMemoryTaskRepository();

const eventBus =
new EventBus();

const listener =
new TaskCreatedListener();

eventBus.subscribe(
  'TaskCreated',
  event => listener.handle(event)
);

const createTaskHandler =
new CreateTaskHandler(
  repository,
  eventBus
);

const getTasksHandler =
new GetTasksHandler(repository);

const taskController =
new TaskController(
  createTaskHandler,
  getTasksHandler
);

app.use(routes(taskController));

module.exports = app;