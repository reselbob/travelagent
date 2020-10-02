const express = require('express');
const {getUsers, getUser} = require('./datastore');
const {seedUsers} = require('./utilties/seeder');
const app = express();
const port = process.env.APP_PORT || 3000;


const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/users/:id', async (req, res) => {
    const data = await getUser(req.params.id);
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data });
    res.end(str);
});

app.get('/users', async (req, res) => {
    const data = await getUsers();
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data });
    res.end(str);
});

app.post('/users', async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const user = await getUser();
    for (let prop in data) {
        user[prop] = data[prop];
    };
    let error;
    const result = await user.save().catch(err => {error = err});
    let statusCode = 200;
    if(error){
        res.writeHead(500, {'Content-Type': 'application/json'});
        const str = JSON.stringify({error });
        console.error(str);
        res.end(str);
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data:result });
    console.log({method: 'post', data:result });
    res.end(str);
});

app.get('/admin/commands', async (req, res) => {
    const commands = [];
    commands.push({method: 'POST', body: {command: 'SEED_USERS', description: 'Seeds the users of the microservice with data'}});
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
        case 'SEED_USERS':
            // seed the inventoryItems
            result = await seedUsers();
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

const agent = 'Users';

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