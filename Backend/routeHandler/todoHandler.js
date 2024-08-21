const express = require('express');
const router = express.Router();

// GET ALL THE TODO
router.get('/', async (req, res) => {});

// GET A TODO by ID
router.get('/:id', async (req, res) => {});

// POST A NEW TODO
router.post('/', async (req, res) => {});

// POST MULTIPLE TODO
router.post('/all', async (req, res) => {});

// POST A TODO
router.put('/:id', async (req, res) => {});

// DELETE A TODO
router.delete('/:id', async (req, res) => {});

module.exports = router;
