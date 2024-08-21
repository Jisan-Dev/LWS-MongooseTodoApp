// const mongoose = require('mongoose');
// const todoSchema = require('../schemas/todoSchema');

// const Todo = new mongoose.model('Todo', todoSchema);
const Todo = require('../models/todoModel');

const getAllTodo = async (_req, res) => {
  try {
    const todos = await Todo.find({}, '-__v'); //excluding __v (projection)
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTodoById = async (req, res) => {
  const id = req.params?.id;
  try {
    const todo = await Todo.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error Occurred', error });
  }
};

module.exports = { getAllTodo, getTodoById };
