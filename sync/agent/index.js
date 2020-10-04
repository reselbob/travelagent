const services = ['AIRLINE','AUTO','HOTEL','USER'];

const missingUrls = [];
if(!process.env.MONGODB_URL)missingUrls.push('MONGODB_URL');
services.forEach((service) => {
    if(!process.env[`${service}_SERVICE_URL`])missingUrls.push(`${service}_SERVICE_URL`);
});

if(missingUrls.length > 0){
    const obj = {message: 'Server cannot start. Missing required URLs.', missingUrls};
    const str = JSON.stringify(obj);
    console.error(str);
    throw new Error(str);
}

services.forEach((service) => {
    if(!process.env[`${service}_SERVICE_URL`])missingUrls.push(`${service}_SERVICE_URL`);
});

//ping the URLS to make sure they're valid
const ping = require('ping');

const badHosts = [];
services.forEach(async (service) => {
    const url = `http://${!process.env[`${service}_SERVICE_URL`]}`;
    if(!process.env[`${service}_SERVICE_URL`])missingUrls.push(`${service}_SERVICE_URL`);
    await ping.promise.probe(url)
        .then(result => {
            console.log({url,result});
            if(!result.alive) badHosts.push({url});
        })
});

if(badHosts.length > 0){
    const obj = {message: 'Server cannot start. Cannot contact required services', badHosts};
    const str = JSON.stringify(obj);
    console.error(str);
    throw new Error(str);
}

const flatted = require('flatted');
const express = require('express');
const app = express();
const port = process.env.APP_PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const myLogger = function (req, res, next) {
    const output = {travelAgentApp: 'agent',createDate: new Date(), req,res};
    console.log(flatted.stringify(output));
    next()
}

app.use(myLogger);

const {getReservations,getReservation,setReservation} = require('./datastore');
const microservices = require('./services');

const agent = 'Way Cool Travel Agent';

app.get('/bestDeal/:service', async (req, res) => {
    const dealmakers = ['AIRLINE','AUTO','HOTEL'];
    if (dealmakers.indexOf(req.params.service) !== -1){
        res.writeHead(400, {'Content-Type': 'application/json'});
        const str = JSON.stringify({message:'Unsupported Service Type', service:  req.params.service});
        console.error({str});
        res.end(str);
        return;
    }
    const data = await microservices[req.params.service.toLowerCase()].getBestDeal()
        .catch(err => {
            res.writeHead(400, {'Content-Type': 'application/json'});
            const str = JSON.stringify({data: err });
            console.error(str);
            res.end(str);
            return;
        });
    res.writeHead(200, {'Content-Type': 'application/json'});
    data.agent = agent;
    const str = JSON.stringify({data});
    console.log(str);
    res.end(str);
    return;
});

app.get('/reservations/:id', async (req, res) => {
    const data = await getReservation(req.params.id)
        .catch(err => {
            res.writeHead(400, {'Content-Type': 'application/json'});
            const str = JSON.stringify({data: err });
            res.end(str);
            return;
        });
    res.writeHead(200, {'Content-Type': 'application/json'});
    data.agent = agent;
    const str = JSON.stringify({data });
    console.log(str);
    res.end(str);
});

app.get('/reservations', async (req, res) => {
    const data = await getReservations()
        .catch(err => {
            res.writeHead(400, {'Content-Type': 'application/json'});
            const str = JSON.stringify({data: err });
            res.end(str);
            return;
        });
    res.writeHead(200, {'Content-Type': 'application/json'});
    data.agent = agent;
    const str = JSON.stringify({data});
    console.log(str);
    res.end(str);
});

app.post('/reservations', async (req, res) => {
    const data = req.body;
    //TODO fix this and make it post data the way it supposed to
    const result = await setReservation(data)
        .catch(err => {
            res.writeHead(400, {'Content-Type': 'application/json'});
            const str = JSON.stringify({data: err });
            res.end(str);
            return;
        });
    result.agent = agent;
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data: result});
    console.log(str);
    res.end(str);
});

app.get('/users/:id', async (req, res) => {
    const data = await microservices.user.getUser(req.params.id)
        .catch(err => {
            res.writeHead(400, {'Content-Type': 'application/json'});
            const str = JSON.stringify({data: err });
            res.end(str);
            return;
        });
    res.writeHead(200, {'Content-Type': 'application/json'});
    data.agent = agent;
    const str = JSON.stringify({data });
    console.log(str);
    res.end(str);
});

app.get('/users', async (req, res) => {
    const data = await microservices.user.getUsers()
        .catch(err => {
            res.writeHead(400, {'Content-Type': 'application/json'});
            const str = JSON.stringify({data: err });
            res.end(str);
            return;
        });
    res.writeHead(200, {'Content-Type': 'application/json'});
    data.agent = agent;
    const str = JSON.stringify({data });
    console.log(str);
    res.end(str);
});

app.post('/users', async (req, res) => {
    const data = await microservices.user.setUser(req.body)
        .catch(err => {
            res.writeHead(400, {'Content-Type': 'application/json'});
            const str = JSON.stringify({data: err });
            res.end(str);
            return;
        });
    res.writeHead(200, {'Content-Type': 'application/json'});
    data.agent = agent;
    const str = JSON.stringify({data });
    console.log(str);
    res.end(str);
});

app.get('/admin/commands', async (req, res) => {
    const commands = [];
    commands.push({method: 'POST', body: {command: 'SEED_TRAVEL_AGENT', description: 'Seeds the Travel Agent of the microservice with data'}});
    const data = commands;
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({data});
    res.end(str);
});

const getServiceUrlsConfigSync = () =>{
    const services = ['AIRLINE', 'AUTO', 'HOTEL', 'USER']
    const obj = {};
    services.forEach(service => {
        obj[service.toLowerCase()] =  process.env[`${service}_SERVICE_URL`];
    });
    return obj;
};

app.post('/admin/commands', async (req, res) => {
    console.log({message: 'received data', url: '/admin/commands', method: 'POST', body: req.body});
    const input = req.body;
    let result = null;
    switch(input.command.toUpperCase()){
        case 'SEED_TRAVEL_AGENT':
            // seed the inventoryItems
            result = await seedTravelAgent(getServiceUrlsConfigSync);
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