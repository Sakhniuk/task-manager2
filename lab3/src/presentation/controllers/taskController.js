const DomainError = require('../../domain/errors/DomainError');

class TaskController {

  constructor(createTask, getTasks) {

    this.createTask = createTask;
    this.getTasks = getTasks;

  }

  create = (req, res) => {

    try {

      const task = this.createTask.execute(req.body);

      res.status(201).json(task);

    } catch (e) {

      if (e instanceof DomainError) {

        return res.status(400).json({
          error: e.message
        });

      }

      res.status(500).json({
        error: 'Server error'
      });

    }

  };

  getAll = (req, res) => {

    const tasks = this.getTasks.execute();

    res.json(tasks);

  };

}

module.exports = TaskController;