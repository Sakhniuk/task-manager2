const express = require('express');

module.exports = (taskController, auth) => {

  const router = express.Router();

  router.post('/tasks', taskController.create);

  router.get('/tasks', taskController.getAll);

  return router;

};