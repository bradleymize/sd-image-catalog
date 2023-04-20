const {getDb} = require('../../database');

module.exports = function(app) {
    console.log("Loading keyword routes");

    app.get('/api/keyword', async (req, res) => {
        const db = await getDb();
        const sql = `SELECT id, keyword FROM keywords ORDER BY keyword`;
        try {
            const rows = await db.all(sql);
            res.send(rows);
        } catch(e) {
            console.error(e.message);
            res.status(500).send();
        }
    });

    app.get('/api/keyword/:id', async (req, res) => {
        const db = await getDb();
        const sql = `SELECT kr.image_id, kr.type, i.name FROM keyword_rankings kr LEFT OUTER JOIN images i on kr.image_id = i.id WHERE kr.keyword_id = ? ORDER BY kr.type DESC`;
        console.log(`Selecting image_id, type, name from keyword_rankings, joining images on kr.image_id = i.id where keyword_id = ${req.params.id}`);
        try {
            const rows = await db.all(sql, req.params.id);
            res.send(rows);
        } catch(e) {
            console.error(e.message);
            res.status(500).send();
        }
    });

    // app.delete('/api/image/:id', async (req, res) => {
    //     const db = await getDb();
    //     const sql = `DELETE FROM images WHERE id = ?`;
    //     try {
    //         await db.get(sql, req.params.id)
    //         res.json({"response": "deleted"});
    //     } catch(e) {
    //         console.error(e.message);
    //         res.status(500).send();
    //     }
    // });
}