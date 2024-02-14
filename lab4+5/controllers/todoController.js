const  Todo  = require('../models/todoModel');

const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);


    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ todo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.params.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTodosWithFilters = async (req, res) => {
  try {
    
    const { limit = 10, skip = 0, status } = req.query;
    const todos = await Todo.find({ status }).limit(parseInt(limit)).skip(parseInt(skip));
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTodo, editTodo, deleteTodo, getUserTodos, getTodosWithFilters };
