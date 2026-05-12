const CreateTaskCommand =
require('../../application/commands/CreateTaskCommand');

const GetTasksQuery =
require('../../application/queries/GetTasksQuery');

class TaskController {

  constructor(
    createTaskHandler,
    getTasksHandler
  ) {

    this.createTaskHandler =
      createTaskHandler;

    this.getTasksHandler =
      getTasksHandler;

  }

  create(req, res) {

    try {

      const command =
        new CreateTaskCommand(
          req.body.title,
          req.body.deadline
        );

      const task =
        this.createTaskHandler.execute(command);

      res.status(201).json(task);

    } catch (error) {

      res.status(400).json({
        error: error.message
      });

    }

  }

  getAll(req, res) {

    const query =
      new GetTasksQuery();

    const tasks =
      this.getTasksHandler.execute(query);

    res.json(tasks);

  }

}

module.exports = TaskController;