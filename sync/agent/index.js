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
    await pingHost(url)
        .then(result => {
            if(!result.alive) badHosts.push({err,url});
        })
});

if(badHosts.length > 0){
    const obj = {message: 'Server cannot start. Cannot contact required services', badHosts};
    const str = JSON.stringify(obj);
    console.error(str);
    throw new Error(str);
}


const express = require('express');
const app = express();
const port = process.env.APP_PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const {getReservations,getReservation} = require('./datastore');
const microservices = require('./services');

app.get('/bestDeal/:service', async (req, res) => {
    const dealmakers = ['AIRLINE','AUTO','HOTEL'];
    if (dealmakers.indexOf(req.params.service) != -1){
        res.writeHead(400, {'Content-Type': 'application/json'});
        const str = JSON.stringify({message:'Unsupported Service Type', service:  req.params.service});
        console.log({str });
        res.end(str);
    }
    const data = await microservices[req.params.service.toLowerCase()].getBestDeal();
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


const agent = 'Travel Agent';

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