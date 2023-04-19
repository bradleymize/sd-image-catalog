const multer = require("multer");
const async = require("async");
const fs = require("fs");
const exifr = require('exifr');
const sharp = require('sharp');
const {getDb} = require("../../database");

module.exports = function(app) {
    const upload = multer({ dest: 'uploads/' });
    const queue = async.queue(processImage, 10);

    console.log("Loading upload routes");

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

    //TODO: Extract metadata from image
    async function processImage(file, callback) {
        const { originalname, mimetype, size, path } = file;
        const bytes = fs.readFileSync(path);
        console.log(`Saving image ${originalname} to: ${path}`);
        const sql = `INSERT INTO images (name, type, size, original, thumbnail, metadata) VALUES (?, ?, ?, ?, ?, ?)`;
        const metadata = await exifr.parse(bytes);
        const thumbnail = await sharp(bytes).resize({
            width: 200,
            height: 200,
            fit: "inside"
        }).toBuffer();
        const data = [originalname, mimetype, size, bytes, thumbnail, metadata?.parameters];
        console.log(`Data:`);
        console.log(data);
        const positivePrompt = metadata?.parameters?.split(`Negative prompt:`)[0]?.replaceAll('\n', ' ');
        const negativePrompt = metadata?.parameters?.split(`Negative prompt:`)[1]?.split("Steps:")[0];
        // console.log(`Positive prompt: ${positivePrompt}`);
        // console.log(`Negative prompt: ${negativePrompt}`);

        try {
            const image = await insertIntoImages(data, path, originalname);
            await insertKeywords(image.lastID, positivePrompt, "positive");
            await insertKeywords(image.lastID, negativePrompt, "negative");

            return `Image ${originalname} saved to database`;
        } catch(err) {
            console.error(err.message);
            fs.unlinkSync(path);
            throw new Error(`Error saving image ${originalname} to database`);
        }
    }

    async function insertIntoImages(data, path, originalname) {
        const db = await getDb();
        const sql = `INSERT INTO images (name, type, size, original, thumbnail, metadata) VALUES (?, ?, ?, ?, ?, ?)`;
        const result = await db.run(sql, data);
        console.log(result);
        fs.unlinkSync(path);
        console.log(`Deleted image ${originalname} from: ${path}`);
        return result;
    }

    async function insertKeywords(imageId, prompt, type) {
        const db = await getDb();
        const keywordsInsertSql = `INSERT OR IGNORE INTO keywords (keyword) VALUES (?);`
        const keywordsSelectSql = `SELECT id FROM keywords WHERE keyword = ?;`
        const keywordRankingsSql = `INSERT OR IGNORE INTO keyword_rankings (type, keyword_id, image_id, rank) VALUES (?, ?, ?, ?)`;

        const tokens = prompt.toLowerCase()
            .split(/[,:]/)
            .map((entry, index) => {
                //TODO: support things like "8k" / "3d"
                return `${entry.replaceAll(/[^a-zA-Z-_\s]/g, '').trim()}`
            })
            .filter((item) => item.length > 0);

        for( const [index, token] of tokens.entries()) {
            await db.run(keywordsInsertSql, token);
            const keyword = await db.get(keywordsSelectSql, token);
            console.log(`Adding ${type} keyword '${token}' (id: ${keyword.id}) for image id ${imageId} with rank of ${index}`);
            await db.run(keywordRankingsSql, [type, keyword.id, imageId, index]);
        }
    }
}