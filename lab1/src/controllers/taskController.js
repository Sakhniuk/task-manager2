let tasks = [];
let id = 1;

exports.create = (req, res) => {
  const { title, deadline } = req.body;

  if (!title) return res.status(400).send("Title required");

  if (deadline && new Date(deadline) < new Date()) {
    return res.status(400).send("Deadline in past");
  }

  const task = { id: id++, title, deadline };
  tasks.push(task);

  res.status(201).json(task);
};

exports.getAll = (req, res) => {
  res.json(tasks);
};

exports.getOne = (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) return res.status(404).send("Not found");

  res.json(task);
};

exports.update = (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) return res.status(404).send("Not found");

  task.title = req.body.title || task.title;

  res.json(task);
};

exports.remove = (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);

  if (index === -1) return res.status(404).send("Not found");

  tasks.splice(index, 1);

  res.status(204).send();
};