const TodosModel = require('../model/todo');


const getAllTodos = (req, res) => {
    try {
        const todos = TodosModel.getAll();
        res.json(todos);
        // return todos;
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const rendertodo = (req, res) => {
    try {
        const todos = TodosModel.getAll();
        console.log(todos);
        // res.json(todos);
        return todos;
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getTodoById = (req, res) => {
    const id = (req.params.id)*1;
    try {
        const todo = TodosModel.getById(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addTodo = (req, res) => {
    const todo = req.body;
    try {
        TodosModel.addTodo(todo);
        res.status(201).json({ message: 'Todo added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




const deleteTodoById = (req, res) => {
    const id = (req.params.id)*1;
    try {
        TodosModel.deleteTodo(id);
        res.json({ message: `Todo with id ${id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateTodoById = (req, res) => {
    const id = (req.params.id)*1;
    const updatedTodo = req.body.text;
    console.log(req.body)
    try {
        TodosModel.updateTodo(id, updatedTodo);
        res.json({ message: `Todo with id ${id} updated successfully` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllTodos,
    getTodoById,
    addTodo,
    deleteTodoById,
    updateTodoById,
    rendertodo,
};
