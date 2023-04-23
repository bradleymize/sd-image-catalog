const {open} = require("sqlite");
const sqlite3 = require('sqlite3').verbose();
let DB_SINGLETON;
async function createTables(recreate = false) {
    console.log("Creating database");
    const db = await getDb();

    //TODO: Drop in the right order
    if(recreate) {
        await db.run(`DROP TABLE keyword_rankings`);
        await db.run(`DROP TABLE images`);
        await db.run(`DROP TABLE keywords`)
    }

    await db.run(`CREATE TABLE IF NOT EXISTS images (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        size INTEGER NOT NULL,
        original BLOB NOT NULL,
        thumbnail BLOB NOT NULL,
        metadata TEXT NULL
    );`);

    await db.run(`CREATE TABLE IF NOT EXISTS keywords (
        id INTEGER PRIMARY KEY,
        keyword TEXT NOT NULL UNIQUE 
    );`);

    await db.run(`CREATE TABLE IF NOT EXISTS keyword_rankings (
        id INTEGER PRIMARY KEY,
        type TEXT NOT NULL,
        keyword_id INTEGER NOT NULL,
        image_id INTEGER NOT NULL,
        rank INTEGER NOT NULL,
        CONSTRAINT keywork_rankings_fk_keywords FOREIGN KEY(keyword_id) REFERENCES keywords(id) ON DELETE CASCADE,
        CONSTRAINT keywork_rankings_fk_images FOREIGN KEY(image_id) REFERENCES images(id) ON DELETE CASCADE,
        UNIQUE(keyword_id, image_id)
    );`);

    await db.run(`CREATE TABLE IF NOT EXISTS prompt_templates (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NULL,
        positive_prompt TEXT NULL,
        negative_prompt TEXT NULL,
        settings TEXT NOT NULL
    );`);

    await db.run(`CREATE TABLE IF NOT EXISTS models (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    );`);

    await db.run(`CREATE TABLE IF NOT EXISTS model_prompt_templates (
        id INTEGER PRIMARY KEY,
        model_id INTEGER NOT NULL,
        prompt_template_id INTEGER NOT NULL,
        CONSTRAINT model_prompt_template_fk_models FOREIGN KEY(model_id) REFERENCES models(id) ON DELETE CASCADE,
        CONSTRAINT model_prompt_template_fk_prompt_templates FOREIGN KEY(prompt_template_id) REFERENCES prompt_templates(id) ON DELETE CASCADE,
        UNIQUE(model_id, prompt_template_id)
    );`);
}

async function getDb() {
    if(!DB_SINGLETON) {
        DB_SINGLETON = await open({filename: 'database.sqlite', driver: sqlite3.Database});
        await DB_SINGLETON.exec(`PRAGMA foreign_keys = ON;`);
    }
    return DB_SINGLETON;
}

module.exports = {
    createTables,
    getDb
};