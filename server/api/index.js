const fs = require('fs');

module.exports = function(app) {
    console.log("Loading api routes");
    fs.readdirSync(__dirname, {withFileTypes: true})
        .filter(item => item.isDirectory())
        .map(dir => dir.name)
        .forEach(dir => {
            console.log(`Loading: ${__dirname}/${dir}`);
            require(`${__dirname}/${dir}`)(app);
        });
}