const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/todoController');
const validateTodoInput = require('../middlewares/todoMiddleware');

router.get('/todos', TodosController.getAllTodos);
router.get('/todos/:id', TodosController.getTodoById);
router.post('/todos', TodosController.addTodo);
router.delete('/todos/:id', validateTodoInput,TodosController.deleteTodoById);
router.patch('/todos/:id', validateTodoInput,TodosController.updateTodoById);


module.exports = router;
