const express = require('express');
const {seedReservations,seedInventoryItems} = require('./utilities/seeder');
const app = express();
const port = process.env.APP_PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const {getInventoryItem, getInventoryItems, getReservations,getReservation} = require('./datastore');
const {getBestDeal} = require('./lib');

app.get('/bestDeal', async (req, res) => {
    const data = await getBestDeal();
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data });
    res.end(str);
});

app.get('/reservations/:id', async (req, res) => {
    const data = await getReservation(req.params.id);
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data });
    res.end(str);
});

app.get('/reservations', async (req, res) => {
    const data = await getReservations();
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data });
    res.end(str);
});

app.post('/reservations', async (req, res) => {
    res.writeHead(501, {'Content-Type': 'application/json'});
    res.send(JSON.stringify({message:'Not Implemented'}));
});

app.get('/inventoryItems/search', async (req, res) => {
    res.writeHead(501, {'Content-Type': 'application/json'});
    res.send(JSON.stringify({message:'Not Implemented'}));
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
    console.log(req.body);
    const data = req.body;
    const item = await getInventoryItem();
    item.property = {
        address_1: data.property.address_1,
        address_2: data.property.address_2,
        city: data.property.city,
        state_province: data.property.state_provincecity,
        postal_code: data.property.postal_code,
        country: data.property.country,
        phone: data.property.phone,
    };
    item.vendor = data.vendor;

    let error;
    //TODO Complete this
    //const result = await item.save().catch(err => {error = err});

    if(error){
        res.writeHead(500, {'Content-Type': 'application/json'});
        const str = JSON.stringify({error });
        console.error(str);
        res.end(str);
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data:result });
    console.log({data:result });
    res.end(str);
});

app.get('/admin/commands', async (req, res) => {
    const commands = [];
    commands.push({method: 'POST', body: {command: 'SEED_INVENTORY_ITEMS', description: 'Seeds the inventoryItems of the microservice with data'}});
    commands.push({method: 'POST', body: {command: 'SEED_RESERVATIONS', description: 'Seeds the reservations of the microservice with data'}});
    const data = commands;
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data});
    res.end(str);
});

app.post('/admin/commands', async (req, res) => {
    console.log({message: 'received data', url: '/admin/commands', method: 'POST', body: req.body});
    const input = req.body;
    let result = null;
    switch(input.command.toUpperCase()){
        case 'SEED_INVENTORY_ITEMS':
            // seed the inventoryItems
            result = await seedInventoryItems();
            break;
        case 'SEED_RESERVATIONS':
            result = await seedReservations();
            break;
    }
    let str = '';
    if(!result){
        const message = {message: 'Unknown Command', command: input.name};
        console.error(message);
        res.writeHead(500, {'Content-Type': 'application/json'});
        str = JSON.stringify({message});
    }else{
        res.writeHead(201, {'Content-Type': 'application/json'});
        const str = JSON.stringify({data: {command: input.name, result}});
        console.log({method: 'post', data: {command: input.name, result}});
    }
    res.end(str);
});

const agent = 'Hotel';

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