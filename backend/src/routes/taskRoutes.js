const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteCompletedTasks
} = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');  // Importa el middleware
const router = express.Router();

router.post('/', protect, createTask);
router.get('/', protect, getTasks);
router.put('/:id', protect, updateTask);
router.delete('/completed', protect, deleteCompletedTasks);


module.exports = router;
