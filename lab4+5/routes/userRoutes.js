const express=require('express');
const {createUser , getUsersFirstName , deleteUser , editUser,login,register}=require('../controllers/userController');
const { model } = require('mongoose');
const userMiddleware = require('../middlewares/userMiddleware');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const userRoutes=express.Router();


userRoutes.post('/',createUser); 
userRoutes.post('/login', login)

userRoutes.post('/signup', register)

userRoutes.get('/',getUsersFirstName); 

userRoutes.delete('/:id',deleteUser) 
userRoutes.patch('/:id',editUser); 


module.exports = userRoutes;