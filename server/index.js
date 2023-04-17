const express = require('express');
const app = express();
const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');
// db.run('DROP TABLE images');
db.run(`CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  size INTEGER NOT NULL,
  original BLOB NOT NULL,
  thumbnail BLOB NOT NULL,
  metadata TEXT NULL
);`);

require('./api/index')(app);

app.use('/', express.static('www'));

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'www', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
