const TaskFactory =
require('../../domain/factories/TaskFactory');

class CreateTaskHandler {

  constructor(
    taskRepository,
    notificationService
  ) {

    this.taskRepository =
      taskRepository;

    this.notificationService =
      notificationService;

  }

  execute(command) {

    const task =
      TaskFactory.create(
        command.title,
        command.deadline
      );

    const createdTask =
      this.taskRepository.save(task);

    this.notificationService.send(
      createdTask
    );

    return createdTask;

  }

}

module.exports = CreateTaskHandler;