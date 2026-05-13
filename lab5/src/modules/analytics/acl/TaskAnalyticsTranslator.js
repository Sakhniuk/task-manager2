class TaskAnalyticsTranslator {

  static fromTaskCreatedEvent(event) {

    return {
      taskId: event.task.id,
      title: event.task.title
    };

  }

}

module.exports = TaskAnalyticsTranslator;