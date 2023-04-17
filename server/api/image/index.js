const sqlite3 = require('sqlite3').verbose();

module.exports = function(app) {
    const db = new sqlite3.Database('database.sqlite');

    console.log("Loading image routes");

    app.get('/api/image', (req, res) => {
        const sql = `SELECT id, name FROM images`; //TODO: limit / offset
        db.all(sql, function(err, rows) {
            if (err) {
                console.error(err.message);
                res.status(500).send();
            } else {
                res.send(rows);
            }
        });
    });

    //TODO: Replace /api/imageThumbnail/:id with /api/image/:id/thumbnail
    //TODO: Add /api/image/:id/info
    app.get('/api/image/:id', (req, res) => {
        const sql = `SELECT type, size, original FROM images WHERE id = ?`;
        db.get(sql, req.params.id, function(err, row) {
            if (err) {
                console.error(err.message);
                res.status(500).send();
            } else {
                res.type(row.type);
                res.send(row.original);
            }
        });
    });

    app.delete('/api/image/:id', (req, res) => {
        const sql = `DELETE FROM images WHERE id = ?`;
        db.get(sql, req.params.id, function(err, row) {
            if (err) {
                console.error(err.message);
                res.status(500).send();
            } else {
                res.json({"response": "deleted"});
            }
        });
    });

    app.get('/api/imageThumbnail/:id', (req, res) => {
        const sql = `SELECT type, size, thumbnail FROM images WHERE id = ?`;
        db.get(sql, req.params.id, function(err, row) {
            if (err) {
                console.error(err.message);
                res.status(500).send();
            } else {
                if(row) {
                    res.type(row.type);
                    res.send(row.thumbnail);
                } else {
                    res.sendStatus(404);
                }
            }
        });
    });
}