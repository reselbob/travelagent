const http = require('http');
const HttpDispatcher = require('httpdispatcher');
const dispatcher = new HttpDispatcher();
const Airline = require('./airline');
const Hotel = require('./hotel');
const Auto = require('./auto');
const Reservation = require('./reservations');
const Users = require('./users');
const port = process.env.APP_PORT || 3000;

const agent = 'Reselbob Travel';

dispatcher.onGet("/airline", async (req, res) => {
    const airline = new Airline();
    const vendors = await airline.getItems();
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({service: 'airline', vendors });
    res.end(str);
});

dispatcher.onGet("/hotel", async (req, res) =>  {
    const hotel = new Hotel();
    const vendors = await hotel.getItems();
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({service: 'hotel',vendors});
    res.end(str);
});

dispatcher.onGet("/auto", async (req, res) =>  {
    const auto = new Auto();
    const vendors = await auto.getItems();
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({service: 'auto', vendors});
    res.end(str);
});

dispatcher.onGet("/reservations", async (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({service: 'reservations'});
    res.end(str);
});

dispatcher.onPost("/reservations", async (req, res) => {
    console.log(req.body);
    const data = JSON.parse(req.body);
    const reservation = new Reservation();
    const result = await reservation.setItem(data);
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({service: 'reservations',result});
    console.log({service: 'reservations',result, date: new Date()})
    res.end(str);
});

dispatcher.onPost("/users", async (req, res) => {
    console.log(req.body);
    const data = JSON.parse(req.body);
    const users = new Users();
    const result = await users.setItem(data);
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({service: 'users',result});
    console.log({service: 'users',result, date: new Date()});
    res.end(str);
});

dispatcher.onError(async (req, res) => {
    res.writeHead(404);
    res.end("Error, the URL doesn't exist");
});

const handleRequest = (request, response) => {

    try {
        // log the request on console
        console.log(request.url);
        // Dispatch
        dispatcher.dispatch(request, response);
    } catch (err) {
        console.log(err);
    }
};

const server = http.createServer(handleRequest);

server.listen(port, () => {
    console.log(`${agent} API Server is listening on port ${port}`);
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
