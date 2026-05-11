const express = require('express');

const auth = require('./middleware/auth');

const InMemoryTaskRepository = require('./infrastructure/repositories/InMemoryTaskRepository');

const CreateTask = require('./application/use-cases/CreateTask');
const GetTasks = require('./application/use-cases/GetTasks');

const TaskController = require('./presentation/controllers/taskController');

const taskRepository = new InMemoryTaskRepository();

const createTask = new CreateTask(taskRepository);
const getTasks = new GetTasks(taskRepository);

const taskController = new TaskController(
  createTask,
  getTasks
);

const taskRoutes = require('./presentation/routes/taskRoutes')(
  taskController,
  auth
);

const app = express();

app.use(express.json());

app.use(taskRoutes);

module.exports = app;