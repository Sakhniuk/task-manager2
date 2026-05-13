class TaskCreatedListener {

  handle(event) {

    console.log(
     ` Async notification: ${event.task.title}`
    );

  }

}

module.exports =
TaskCreatedListener;