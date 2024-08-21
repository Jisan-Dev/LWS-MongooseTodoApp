const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const { verifyToken } = require('../middlewares/verifyToken');
const { getAllTodo, getTodoById } = require('../controllers/todo.controller');
const Todo = new mongoose.model('Todo', todoSchema);

// GET ALL THE TODO
router.get('/', verifyToken, getAllTodo);

// GET A TODO by ID
router.get('/:id', getTodoById);

// POST A NEW TODO
router.post('/', async (req, res) => {
  const newTodo = new Todo(req.body);

  try {
    const result = await newTodo.save();
    res.status(201).json({ message: 'Todo inserted successfully', result });
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST MULTIPLE TODO
router.post('/all', async (req, res) => {
  try {
    const result = await Todo.insertMany(req.body);
    res.status(201).json({ success: true, message: 'Todos inserted successfully', result });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

// POST A TODO
router.put('/:id', async (req, res) => {});

// DELETE A TODO
router.delete('/:id', async (req, res) => {});

module.exports = router;
