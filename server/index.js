const express = require('express');
const app = express();
const path = require('path');
const {createTables} = require('./database/index');

async function init() {
    await createTables();

    app.use(express.json());
    app.use('/', express.static('www'));

    require('./api/index')(app);

    app.get('*', function (request, response) {
        response.sendFile(path.resolve(__dirname, 'www', 'index.html'));
    });

    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

init();