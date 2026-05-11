const express = require('express');

module.exports = (taskController, auth) => {

  const router = express.Router();

  router.post('/tasks', auth, taskController.create);

  router.get('/tasks', auth, taskController.getAll);

  return router;

};