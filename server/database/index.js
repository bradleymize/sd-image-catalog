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