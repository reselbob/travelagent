const express = require('express');
const app = express();
const port = process.env.APP_PORT || 3000;

const {getInventoryItem, getInventoryItems, getReservation} = require('./datastore');

app.get('/inventoryItems/search', async (req, res) => {
    res.send('Not Implemented');
});

app.get('/inventoryItems/:id', async (req, res) => {
    const data = await getInventoryItem(req.params.id);
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data });
    res.end(str);
});

app.get('/inventoryItems', async (req, res) => {
    const data = await getInventoryItems();
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data });
    res.end(str);
});

app.post('/inventoryItems/', async (req, res) => {
    res.send('Not Implemented');
});


const agent = 'Auto';

var server = app.listen(port, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`${agent} API Server started listening on listening ${host}:${port} at ${new Date()}`)
});

const shutdown = (signal) => {
    if (!signal) {
        console.log(`${agent} API Server shutting down at ${new Date()}`);
    } else {
        console.log(`Signal ${signal} : ${agent} API Server shutting down at ${new Date()}`);
    }
    server.close(function () {
        process.exit(0);
    })
};
process.on('SIGTERM', function () {
    shutdown('SIGTERM');
});

process.on('SIGINT', function () {
    shutdown('SIGINT');
});

module.exports = {server, shutdown};