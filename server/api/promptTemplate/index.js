const {getDb} = require('../../database');

module.exports = function(app) {
    console.log("Loading prompt template routes");

    app.get('/api/promptTemplate', async (req, res) => {
        const db = await getDb();
        const sql = `SELECT id, name, description, positive_prompt as positivePrompt, negative_prompt as negativePrompt, settings FROM prompt_templates ORDER BY name`;
        try {
            const rows = await db.all(sql);
            res.send(rows);
        } catch(e) {
            console.error(e.message);
            res.status(500).send();
        }
    });

    app.get('/api/promptTemplate/:id', async (req, res) => {
        const db = await getDb();
        const sql = `SELECT id, name, description, positive_prompt as positivePrompt, negative_prompt as negativePrompt, settings FROM prompt_templates WHERE id = ?`;
        try {
            const row = await db.get(sql, req.params.id);
            res.send(row);
        } catch(e) {
            console.error(e.message);
            res.status(500).send();
        }
    });

    app.post('/api/promptTemplate', async (req, res) => {
        const db = await getDb();
        const sql = `INSERT INTO prompt_templates (name, description, positive_prompt, negative_prompt, settings) VALUES (?, ?, ?, ?, ?)`;
        console.log(req);
        const data = [
            req.body.name,
            req.body.description,
            req.body.positivePrompt,
            req.body.negativePrompt,
            req.body.settings
        ]
        try {
            const results = await db.run(sql, data);
            res.json({"response": `Prompt template saved to database`});
        } catch(e) {
            console.error(e.message);
            res.status(500).send();
        }
    });

    app.put('/api/promptTemplate/:id', async (req, res) => {
        const db = await getDb();
        const sql = `UPDATE prompt_templateS SET name = ?, description = ?, positive_prompt = ?, negative_prompt = ?, settings = ? WHERE ID = ?`;
        const data = [
            req.body.name,
            req.body.description,
            req.body.positivePrompt,
            req.body.negativePrompt,
            req.body.settings,
            req.params.id
        ]
        try {
            const results = await db.run(sql, data);
            res.json({"response": `Prompt template updated`});
        } catch(e) {
            console.error(e.message);
            res.status(500).send();
        }
    });

    app.delete('/api/promptTemplate/:id', async (req, res) => {
        const db = await getDb();
        const sql = `DELETE FROM prompt_templates WHERE id = ?`;
        try {
            await db.get(sql, req.params.id)
            res.json({"response": "deleted"});
        } catch(e) {
            console.error(e.message);
            res.status(500).send();
        }
    });
}