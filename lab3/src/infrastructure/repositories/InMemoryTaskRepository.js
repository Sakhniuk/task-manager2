class InMemoryTaskRepository {

  constructor() {

    this.tasks = [];
    this.id = 1;

  }

  save(task) {

    task.id = this.id++;

    this.tasks.push(task);

    return task;

  }

  findAll() {

    return this.tasks;

  }

  findById(id) {

    return this.tasks.find(
      t => t.id == id
    );

  }

}

module.exports =
InMemoryTaskRepository;