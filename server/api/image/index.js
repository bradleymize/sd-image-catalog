const {getDb} = require('../../database');

module.exports = function(app) {
    console.log("Loading image routes");

    app.get('/api/image', async (req, res) => {
        const db = await getDb();
        const sql = `SELECT id, name FROM images`; //TODO: limit / offset
        try {
            const rows = await db.all(sql);
            res.send(rows);
        } catch(e) {
            console.error(e.message);
            res.status(500).send();
        }
    });

    //TODO: Replace /api/imageThumbnail/:id with /api/image/:id/thumbnail
    //TODO: Add /api/image/:id/info
    app.get('/api/image/:id', async (req, res) => {
        const db = await getDb();
        const sql = `SELECT type, size, original FROM images WHERE id = ?`;
        try {
            const row = await db.get(sql, req.params.id);
            res.type(row.type);
            res.send(row.original);
        } catch(e) {
            console.error(e.message);
            res.status(500).send();
        }
    });

    app.delete('/api/image/:id', async (req, res) => {
        const db = await getDb();
        const sql = `DELETE FROM images WHERE id = ?`;
        try {
            await db.get(sql, req.params.id)
            res.json({"response": "deleted"});
        } catch(e) {
            console.error(e.message);
            res.status(500).send();
        }
    });

    app.get('/api/imageThumbnail/:id', async (req, res) => {
        const db = await getDb();
        const sql = `SELECT type, size, thumbnail FROM images WHERE id = ?`;
        try {
            const row = await db.get(sql, req.params.id);
            if(row) {
                res.type(row.type);
                res.send(row.thumbnail);
            } else {
                res.sendStatus(404);
            }
        } catch(e) {
            console.error(e.message);
            res.status(500).send();
        }
    });
}