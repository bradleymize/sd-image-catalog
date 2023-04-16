const sqlite3 = require('sqlite3').verbose();

module.exports = function(app) {
    const db = new sqlite3.Database('database.sqlite');

    console.log("Loading image routes");

    app.get('/api/image', (req, res) => {
        const sql = `SELECT id FROM images`; //TODO: limit / offset
        db.all(sql, function(err, rows) {
            if (err) {
                console.error(err.message);
                res.status(500).send();
            } else {
                res.send(rows);
            }
        });
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
}