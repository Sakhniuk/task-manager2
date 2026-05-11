const TaskFactory =
require('../../domain/factories/TaskFactory');

class CreateTaskHandler {

  constructor(taskRepository) {

    this.taskRepository = taskRepository;

  }

  execute(command) {

    const task =
      TaskFactory.create(
        command.title,
        command.deadline
      );

    return this.taskRepository.save(task);

  }

}

module.exports = CreateTaskHandler;