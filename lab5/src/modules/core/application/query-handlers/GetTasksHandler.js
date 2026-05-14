class GetTasksHandler {

  constructor(taskRepository) {

    this.taskRepository = taskRepository;

  }

  execute() {

    return this.taskRepository.findAll();

  }

}

module.exports = GetTasksHandler;