const express = require('express');
const router = express.Router();

const auth = require('./middleware/auth');
const authCtrl = require('./controllers/authController');
const taskCtrl = require('./controllers/taskController');

router.post('/auth/register', authCtrl.register);

router.post('/tasks', auth, taskCtrl.create);
router.get('/tasks', auth, taskCtrl.getAll);
router.get('/tasks/:id', auth, taskCtrl.getOne);
router.put('/tasks/:id', auth, taskCtrl.update);
router.delete('/tasks/:id', auth, taskCtrl.remove);

module.exports = router;