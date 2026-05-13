const TaskAnalytics =
require('../domain/TaskAnalytics');

const Translator =
require('../acl/TaskAnalyticsTranslator');

class TaskAnalyticsListener {

  constructor() {

    this.analytics =
      new TaskAnalytics();

  }

  handle(event) {

    const data =
      Translator.fromTaskCreatedEvent(event);

    this.analytics.increment();

    console.log(
      'Analytics updated:',
      data
    );

  }

}

module.exports =
TaskAnalyticsListener;