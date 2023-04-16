const multer = require("multer");
const async = require("async");
const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();

module.exports = function(app) {
    const db = new sqlite3.Database('database.sqlite');
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
    function processImage(file, callback) {
        const { originalname, mimetype, size, path } = file;
        const bytes = fs.readFileSync(path);
        console.log(`Saving image ${originalname} to: ${path}`);
        const data = [originalname, mimetype, size, bytes];
        const sql = `INSERT INTO images (name, type, size, data) VALUES (?, ?, ?, ?)`;

        db.run(sql, data, function(err) {
            if (err) {
                console.error(err.message);
                callback(`Error saving image ${originalname} to database`);
            } else {
                fs.unlinkSync(path);
                console.log(`Deleted image ${originalname} from: ${path}`);
                callback(null, `Image ${originalname} saved to database`);
            }
        });
    }
}