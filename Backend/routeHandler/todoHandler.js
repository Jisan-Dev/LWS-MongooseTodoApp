const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);

// GET ALL THE TODO
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET A TODO by ID
router.get('/:id', async (req, res) => {
  const id = req.params?.id;
  try {
    const todo = await Todo.findById(id).exec();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error Occurred', error });
  }
});

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
router.post('/all', async (req, res) => {});

// POST A TODO
router.put('/:id', async (req, res) => {});

// DELETE A TODO
router.delete('/:id', async (req, res) => {});

module.exports = router;
