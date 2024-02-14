
const getById = (id) => {
    const todos = getAll();
    return todos.find(todo => todo.id === id);
};

// const addTodo = (todo) => {
//     const todos = getAll();
//     todos.push(todo);
//     fs.writeFileSync(todoFile, JSON.stringify(todos, null, 2));
// };

// const deleteTodo = (id) => {
//     let todos = getAll();
//     todos = todos.filter(todo => todo.id !== id);
//     fs.writeFileSync(todoFile, JSON.stringify(todos, null, 2));
// };

// const updateTodo = (id, updatedTodo) => {
//     let todos = getAll();
//     todos = todos.map(todo => (todo.id === id ? updatedTodo : todo));
//     fs.writeFileSync(todoFile, JSON.stringify(todos, null, 2));
// };



const fs = require('fs');
const path = require('path');

const args = process.argv;
const todoFile = path.join(__dirname, '../todo.json');

function getAll() {
    try {
        const data = fs.readFileSync(todoFile, 'utf8');
        // console.log(data);
        return JSON.parse(data);
    } catch (err) {
        return err;
    }
}

function getAllRender() {
    try {
        const data = fs.readFileSync(todoFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return err;
    }
}

function write(list) {
    fs.writeFileSync(todoFile, JSON.stringify(list, null, 2));
}

function list() {
    const todoList = read();
    console.log('To-Do List:');
    const print=todoList.map(entry => {
       return `${entry.id}. ${entry.text}`;
    });
    console.log(print.join("\n"));

}

function addTodo(todo) {
    // if (entryText.trim() === '') {
    //     console.log('Entry text cannot be empty.');
    //     return; //empty string --->done
    // }
    const todoList =JSON.parse( fs.readFileSync(todoFile, 'utf8'));


 
    const newId = todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1;
    console.log(todoList.length );

    const newEntry = {

        id: newId, //id
        text: todo.text //arg
    };
    // console.log(todoList);

    const todos = getAll();
    todos.push(newEntry);
    fs.writeFileSync(todoFile, JSON.stringify(todos, null, 2));
    console.log('New entry added successfully.');
}

function updateTodo(id, newText) {
    const todoList = getAll();
    console.log(todoList);
    const index = todoList.findIndex(entry => entry.id === parseInt(id)); 
    if (index == -1) {
        console.log('Entry not found.');

    } else {
        todoList[index].text = newText;
        write(todoList);
        console.log(`Entry with id ${id} has been edited.`);
    }
}//reverse condition--->done



// function deletelist(id,entry){
//     let todoList = read();//.map to not edit and use let
//     todoList=todoList.filter(entry=>entry.id !== parseInt(id));
//     write(todoList);
//     console.log(`task with id ${id} has been deleted`);

// }


function deleteTodo(id) {//removing let.--->done
    const todoList = getAll();

    const updatedList = todoList.filter(entry => entry.id !== parseInt(id));
    if (updatedList.length === todoList.length) {
        console.log(`Task with id ${id} not found`);
    } else {
        write(updatedList);
        console.log(`Task with id ${id} has been deleted`);
    }
}



module.exports = {
    getAll,
    getById,
    addTodo,
    deleteTodo,
    updateTodo,
    getAllRender
};
