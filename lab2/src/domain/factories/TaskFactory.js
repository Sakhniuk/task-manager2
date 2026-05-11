const Task = require('../entities/Task');
const DomainError = require('../errors/DomainError');

class TaskFactory {

  static create({ id, title, deadline }) {

    if (!title) {
      throw new DomainError('Title required');
    }

    if (deadline && new Date(deadline) < new Date()) {
      throw new DomainError('Deadline in past');
    }

    return new Task(id, title, deadline);

  }

}

module.exports = TaskFactory;