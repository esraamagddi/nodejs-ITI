const express = require('express');
const app = express();
const fs = require('fs'); 
const path = require('path');
const TodosController=require('../controllers/todoController');
app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'public')));
const router = require('../routes/routes'); 

const todos = JSON.parse(fs.readFileSync(path.join(__dirname, '../todo.json'), 'utf8'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'../views'));

 app.use('/', router);

app.get('/test', (req, res) => {

const todos=TodosController.rendertodo();
     res.render('index', { todos });
});





const port = 3200;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
