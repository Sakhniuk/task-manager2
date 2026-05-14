const TaskFactory =
require('../../modules/core/domain/factories/TaskFactory');


const TaskCreatedEvent =
require('../../events/TaskCreatedEvent');

class CreateTaskHandler {

  constructor(
    taskRepository,
    eventBus
  ) {

    this.taskRepository =
      taskRepository;

    this.eventBus =
      eventBus;

  }

  execute(command) {

    const task =
      TaskFactory.create(
        command.title,
        command.deadline
      );

    const createdTask =
      this.taskRepository.save(task);

    this.eventBus.publish(
      'TaskCreated',
      new TaskCreatedEvent(createdTask)
    );

    return createdTask;

  }

}

module.exports = CreateTaskHandler;