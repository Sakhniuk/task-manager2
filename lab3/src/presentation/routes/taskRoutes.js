const express = require('express');

const router = express.Router();

module.exports = (taskController) => {

  router.post('/tasks',
    (req, res) =>
      taskController.create(req, res)
  );

  router.get('/tasks',
    (req, res) =>
      taskController.getAll(req, res)
  );

  return router;

};