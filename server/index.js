const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');
db.run(`CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  size INTEGER NOT NULL,
  data BLOB NOT NULL
);`);

require('./api/index')(app);

app.use('/', express.static('www'));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
