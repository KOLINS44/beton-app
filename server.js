const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// Create table if not exists
const initSql = `CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  grade TEXT NOT NULL,
  volume REAL NOT NULL,
  date TEXT NOT NULL
)`;
db.run(initSql);

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/zayavki', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/zayavki.html'));
});

app.post('/submit', (req, res) => {
  const { name, phone, address, grade, volume, date } = req.body;
  const stmt = db.prepare('INSERT INTO orders (name, phone, address, grade, volume, date) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run(name, phone, address, grade, volume, date, err => {
    if (err) {
      console.error(err);
    }
    res.redirect('/zayavki');
  });
  stmt.finalize();
});

app.get('/orders', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY id DESC', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'database error' });
    }
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
