const TaskFactory = require('../../domain/factories/TaskFactory');

class CreateTask {

  constructor(taskRepository) {

    this.taskRepository = taskRepository;

  }

  execute(data) {

    const task = TaskFactory.create(data);

    return this.taskRepository.create(task);

  }

}

module.exports = CreateTask;