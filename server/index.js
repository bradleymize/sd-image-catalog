const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const async = require('async');
const fs = require('fs');
Buffer = require('safe-buffer').Buffer

const app = express();

const upload = multer({ dest: 'uploads/' });
const db = new sqlite3.Database('database.sqlite');
db.run(`CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  size INTEGER NOT NULL,
  data BLOB NOT NULL
);`);
const queue = async.queue(processImage, 10);

function processImage(file, callback) {
    const { originalname, mimetype, size, path } = file;
    const bytes = fs.readFileSync(path);
    console.log("Path: foo");
    console.log(path);
    console.log("Bytes: foo");
    console.log(bytes);
    const data = [originalname, mimetype, size, bytes];
    const sql = `INSERT INTO images (name, type, size, data) VALUES (?, ?, ?, ?)`;

    db.run(sql, data, function(err) {
        if (err) {
            console.error(err.message);
            callback(`Error saving image ${originalname} to database`);
        } else {
            fs.unlinkSync(path);
            callback(null, `Image ${originalname} saved to database`);
        }
    });
}

app.get('/api/ping', (req, res) => {
   res.json({"response": "Pong"});
});

app.get('/api/image/:id', (req, res) => {
    const sql = `SELECT type, size, data FROM images WHERE id = ?`;
    db.get(sql, req.params.id, function(err, row) {
        if (err) {
            console.error(err.message);
            res.status(500).send();
        } else {
            res.type(row.type);
            res.send(row.data);
        }
    });
});



app.get('/api/image', (req, res) => {
    const sql = `SELECT id FROM images`; //TODO: limit / offset
    db.all(sql, function(err, rows) {
        if (err) {
            console.error(err.message);
            res.status(500).send();
        } else {
            console.log(rows);
            res.send(rows);
        }
    });
});

//TODO: include width and height
app.post('/api/upload', upload.any(), (req, res) => {
    const files = req.files;
    const errors = [];

    files.forEach(file => {
        queue.push(file, err => {
            if (err) {
                errors.push(err);
            }
        });
    });

    queue.drain(() => {
        if (errors.length > 0) {
            res.status(500).json({"error": errors.join('\n')});
        } else {
            res.json({"response": `${files.length} images saved to database`});
        }
    });
});

app.use('/', express.static('www'));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
