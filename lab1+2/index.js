const fs = require('fs');
const path = require('path');

const args = process.argv;
const todoFile = path.join(__dirname, 'todo.json');

function read() {
    try {
        const data = fs.readFileSync(todoFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
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

function add(entryText) {
    if (entryText.trim() === '') {
        console.log('Entry text cannot be empty.');
        return; //empty string --->done
    }

    const todoList = read();
    const newEntry = {
        id: todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1, //id
        text: entryText //arg
    };
    todoList.push(newEntry);
    write(todoList);
    console.log('New entry added successfully.');
}

function edit(id, newText) {
    const todoList = read();
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


function deletelist(id) {//removing let.--->done
    const todoList = read();
    const updatedList = todoList.filter(entry => entry.id !== parseInt(id));
    if (updatedList.length === todoList.length) {
        console.log(`Task with id ${id} not found`);
    } else {
        write(updatedList);
        console.log(`Task with id ${id} has been deleted`);
    }
}




const command = process.argv[2]; 
if (command === 'add') {
    const entryText = process.argv[3]; 
    if (entryText) {
        add(entryText);
        // list();
    } else {
        console.log('Please provide the text for the new entry.');
    }
} else if (command === 'list') {
    list();
}
else if (command === 'edit')
{
    const entryId = process.argv[3];
    const newText = process.argv[4];
    
    if (entryId && newText) {
        edit(entryId, newText);
    } else {
        console.log('Please provide The ID and the new text for editing.');
    }

} 
else if(command === 'delete')
{
    const entryId = process.argv[3];

    if (entryId)
    {
        deletelist(entryId);
    }
    else
    {
        console.log("Id not found");
    }
}
else {
    console.log('Invalid command.');
}
