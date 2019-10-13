const http = require('http');
const HttpDispatcher = require('httpdispatcher');
const dispatcher = new HttpDispatcher();
const Airline = require('./airline');
const Hotel = require('./hotel');
const Auto = require('./auto');
const Reservation = require('./reservations');
const Users = require('./users');
const Authentication = require('./authentication/model');
const port = process.env.APP_PORT || 3000;
//const {validateItem} = require('./utilities');

const agent = 'Reselbob Travel';

dispatcher.onGet("/airline", async (req, res) => {
    const airline = new Airline();
    const vendors = await airline.getInventoryItems();
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({service: 'airline', vendors });
    res.end(str);
});

dispatcher.onGet("/airline/bestDeal", async (req, res) => {
    const airline = new Airline();
    const data = await airline.getBestDeal();
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({service: 'airlineBestDeal', data });
    res.end(str);
});

dispatcher.onGet("/hotel", async (req, res) =>  {
    const hotel = new Hotel();
    const vendors = await hotel.getInventoryItems();
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({service: 'hotel',vendors});
    res.end(str);
});

dispatcher.onGet("/hotel/bestDeal", async (req, res) => {
    const hotel = new Hotel();
    const data = await hotel.getBestDeal('HOTEL');
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({service: 'hotelBestDeal', data });
    res.end(str);
});

dispatcher.onGet("/auto", async (req, res) =>  {
    const auto = new Auto();
    const vendors = await auto.getInventoryItems();
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({service: 'auto', vendors});
    res.end(str);
});

dispatcher.onGet("/auto/bestDeal", async (req, res) => {
    const auto = new Auto();
    const data = await auto.getBestDeal();
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({service: 'autoBestDeal', data });
    res.end(str);
});

dispatcher.onGet("/reservations", async (req, res) => {
    //Check to see if there is an id, query parameter
    let id;
    if(req.url.indexOf('?') > 0){
        const arr = req.url.substring(req.url.indexOf('?')+ 1).split('=');
        if(arr[0]=== 'id')id = arr[1];
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    let data;
    if(id){
        data = await new Reservation().getItem(id);
    }else{
        data = await new Reservation().getItems();
    }

    console.log({message: 'Return reservations', data});
    const str = JSON.stringify({service: 'reservations', data});
    res.end(str);
});

dispatcher.onGet("/reservations/bestDeal", async (req, res) => {
    const data = await new Reservation().getBestDeal('ALL');
    res.writeHead(200, {'Content-Type': 'application/json'});
    const str = JSON.stringify({service: 'reservationBestDeal', data });
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


const postToUsers = async (userData) =>{
    const users = new Users();
    const pwd = userData.password;
    //remove the password from the user
    delete userData.password;
    let result = await users.setItem(userData);

    //reattach the password
    userData.password = pwd;

    result = await postToAuthentication(userData);
    return result
};

const postToAuthentication = async (userData) =>{
    const authentication = new Authentication();
    const result = await authentication.setItem(userData);
    return result;
};

dispatcher.onGet("/authenticate", async (req, res) => {
    res.writeHead(501, {'Content-Type': 'application/json'});
    const obj =  {service: 'authenticate', message: "Not Implemented"};
    const str = JSON.stringify(obj);
    console.log(str);
    res.end(str);
});



dispatcher.onPost("/users", async (req, res) => {
    console.log(req.body);
    const data = JSON.parse(req.body);
    const result = await postToUsers(data);
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
