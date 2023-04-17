const multer = require("multer");
const async = require("async");
const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');
const exifr = require('exifr');
const sharp = require('sharp');

module.exports = async function(app) {
    const db = await open({filename: 'database.sqlite', driver: sqlite3.Database});
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

        try {
            const result = await db.run(sql, data);
            console.log(result);
            fs.unlinkSync(path);
            console.log(`Deleted image ${originalname} from: ${path}`);
            return `Image ${originalname} saved to database`;
        } catch(err) {
            console.error(err.message);
            throw new Error(`Error saving image ${originalname} to database`);
        }
    }
}