// models/task.js
const db = require('../db');

module.exports = {

  // عرض كل المهام
  getAll: (callback) => {
    db.all("SELECT * FROM tasks", (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  },

  // عرض مهمة واحدة بالـ ID
  getById: (id, callback) => {
    db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
      if (err) return callback(err);
      callback(null, row);
    });
  },

  // إضافة مهمة جديدة
  add: (title, description, callback) => {
    db.run(
      "INSERT INTO tasks (title, description, completed) VALUES (?, ?, 0)",
      [title, description || ''],
      function(err) {
        if (err) return callback(err);
        callback(null, { id: this.lastID, title, description: description || '', completed: 0 });
      }
    );
  },

  // تحديث مهمة
  update: (id, data, callback) => {
    const { title, description, completed } = data;
    db.run(
      "UPDATE tasks SET title = COALESCE(?, title), description = COALESCE(?, description), completed = COALESCE(?, completed) WHERE id = ?",
      [title, description, completed, id],
      function(err) {
        if (err) return callback(err);
        callback(null, { id, title, description, completed });
      }
    );
  },

  // حذف مهمة
  delete: (id, callback) => {
    db.run("DELETE FROM tasks WHERE id = ?", [id], function(err) {
      if (err) return callback(err);
      callback(null, { id });
    });
  }

};