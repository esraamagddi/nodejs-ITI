const express=require('express');
const {createTodo, editTodo, deleteTodo, getUserTodos, getTodosWithFilters }=require('../controllers/todoController');
const { model } = require('mongoose');
const todoMiddleware = require('../middlewares/todoMiddleware');
const userController=require('../middlewares/userMiddleware');
const userMiddleware = require('../middlewares/userMiddleware');
const todoRoutes = express.Router();

todoRoutes.post('/',createTodo) 

todoRoutes.get('/',getTodosWithFilters); 
todoRoutes.get('/',getTodosWithFilters); 


todoRoutes.patch('/:id',editTodo) 
todoRoutes.delete('/:id',deleteTodo); 

todoRoutes.get('/:userId/users',getUserTodos);


module.exports = todoRoutes;





