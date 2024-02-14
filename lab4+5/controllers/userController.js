const  User  = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const getUsersFirstName = async (req, res) => {
  try {
    const user = await User.find({}, 'firstName');
    // console.log(user);
    const firstNames = user.map(user => user.firstName);
    res.json(firstNames);
    // res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// User registration
const register= async (req, res) => {
try {
const {  username, firstname, lastname, password } = req.body;
const hashedPassword = await bcrypt.hash(password, 10);
const user = await User.create({ username,firstname, lastname, password: hashedPassword });
await user.save();
res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
    console.log(error.message);
res.status(500).json({ error: 'Registration failed' });
}
};

// User login
const login=async (req, res) => {
try {
const { username, password } = req.body;
const user = await User.findOne({ username });
if (!user) {
return res.status(401).json({ error: 'Authentication failed' });
}
const passwordMatch = await bcrypt.compare(password, user.password);
if (!passwordMatch) {
return res.status(401).json({ error: 'Authentication failed' });
}
const token = jwt.sign({ userId: user._id }, 'qwertyuioplkjhgfdsa', {
expiresIn: '1h',
});
res.status(200).json({ token });
} catch (error) {
    console.log(error.message);
res.status(500).json({ error: 'Login failed' });
}
};
module.exports = { createUser, getUsersFirstName, deleteUser, editUser,register,login };
