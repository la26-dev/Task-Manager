const express = require('express');
const router = express.Router();
const Task = require(__dirname + '/../models/task.js');



router.get('/', (req, res) => {
  Task.getAll((err, tasks) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(tasks);
  });
});

// عرض مهمة واحدة بالـ ID
router.get('/:id', (req, res) => {
  Task.getById(parseInt(req.params.id), (err, task) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  });
});

// إضافة مهمة جديدة
router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  Task.add(title, description, (err, task) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json(task);
  });
});

// تحديث مهمة
router.put('/:id', (req, res) => {
  Task.update(parseInt(req.params.id), req.body, (err, task) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(task);
  });
});

// حذف مهمة
router.delete('/:id', (req, res) => {
  Task.delete(parseInt(req.params.id), (err, task) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(task);
  });
});

module.exports = router;
