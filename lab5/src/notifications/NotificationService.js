class NotificationService {

  send(task) {

    console.log(
     ` Notification: ${task.title}`
    );

  }

}

module.exports = NotificationService;