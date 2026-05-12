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

const app = express();

app.use(express.json());

const repository =
new InMemoryTaskRepository();

const createTaskHandler =
new CreateTaskHandler(repository);

const getTasksHandler =
new GetTasksHandler(repository);

const taskController =
new TaskController(
  createTaskHandler,
  getTasksHandler
);

app.use(routes(taskController));

module.exports = app;