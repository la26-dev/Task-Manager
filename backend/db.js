// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tasks.db');

// إنشاء جدول المهام إذا ما كان موجود، مع عمود description
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      completed INTEGER
    )
  `);
});

module.exports = db;