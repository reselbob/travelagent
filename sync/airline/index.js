const express = require('express');
const app = express();
const port = process.env.APP_PORT || 3000;
const {seedInventoryItems,seedReservations} = require('./utilties/seeder');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
const {getInventoryItem, getInventoryItems, getReservation, getReservations} = require('./datastore');
const {getBestDeal} = require('./lib');

app.get('/bestDeal', async (req, res) => {
    const data = await getBestDeal();
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data});
    res.end(str);
});


app.get('/reservations/:id', async (req, res) => {
    const data = await getReservation(req.params.id);
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data});
    res.end(str);
});

app.get('/reservations', async (req, res) => {
    const data = await getReservations();
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data});
    res.end(str);
});

app.post('/reservations', async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const reservation = await getReservation();
    reservation.user = {
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        phone: data.user.phone,
    };
    reservation.airline = data.airline;
    reservation.flightNumber = data.flightNumber;
    reservation.from = data.from;
    reservation.to = data.to;
    reservation.vendor = data.vendor;
    reservation.departure = data.departure;
    reservation.arrival = data.arrival;
    reservation.price = data.price;
    //TODO Complete this
    //const result = await reservation.save().catch(err => {error = err});
    let statusCode = 200;
    if (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        const str = JSON.stringify({error});
        console.error(str);
        res.end(str);
    }
    res.writeHead(statusCode, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data: result});
    console.log({method: 'post', data: result});
    res.end(str);
});


app.get('/inventoryItems/:id', async (req, res) => {
    const data = await getInventoryItem(req.params.id);
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data});
    res.end(str);
});

app.get('/inventoryItems/', async (req, res) => {
    const data = await getInventoryItem(req.params.id);
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data});
    res.end(str);
});

app.post('/inventoryItems/', async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const item = await getInventoryItem();
    for (let prop in data) {
        item[prop] = data[prop];
    }
    let error;
    const result = await item.save().catch(err => {
        error = err
    });
    if (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        const str = JSON.stringify({error});
        console.error(str);
        res.end(str);
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data: result});
    console.log({method: 'post', data: result});
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




const agent = 'Airline';

const server = app.listen(port, function () {
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