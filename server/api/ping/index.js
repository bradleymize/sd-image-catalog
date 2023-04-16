module.exports = function(app) {
    console.log("Loading ping routes");

    app.get('/api/ping', (req, res) => {
        res.json({"response": "Pong"});
    });
}