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
    res.status(201).json({ success: true, message: 'Todo inserted successfully', result });
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
    res.status(500).json({ success: false, message: 'SInternal Server Error', error });
  }
});

// PUT A TODO
router.put('/:id', async (req, res) => {
  const id = req.params?.id;
  const update = req.body;
  try {
    // const result = await Todo.updateOne({ _id: id }, update); // returns matchedCount, modifiedCount etc
    const result = await Todo.findByIdAndUpdate(id, update, { new: true }); // returns updatedData
    if (!result) return res.status(404).json({ success: false, message: 'Something went wrong' });
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
});

// DELETE A TODO
router.delete('/:id', async (req, res) => {
  const id = req.params?.id;
  try {
    const result = await Todo.findByIdAndDelete(id); //findByIdAndDelete(id) is a shorthand for findOneAndDelete({ _id: id }). ~deleteOne({_id: id}) also works~
    if (!result) return res.status(404).json({ success: false, message: 'Something went wrong' });
    res.status(200).json({ success: true, deletedTodo: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
});

module.exports = router;
