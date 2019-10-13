const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
const env = dotenv.config();
const util = require('util');
const http = require('http');
const HttpDispatcher = require('httpdispatcher');
const dispatcher = new HttpDispatcher();
const port = process.env.APP_PORT || 3000;

if (!process.env.MONGODB_URL) throw new Error('The required environment variable, MONGODB_URL is missing a value.');
if (!process.env.MONGODB_DB_NAME) throw new Error('The required environment variable, MONGODB_DB_NAME is missing a value.');

// Connection URL
const url = process.env.MONGODB_URL;

// Database Name
const dbName = process.env.MONGODB_DB_NAME;

const mconnect = util.promisify(MongoClient.connect);
let client;

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
server.listen(port, async () => {
    client = await mconnect(url)
        .catch(err => {
            console.error(err);
        });
    console.log(`Connected to datastore successfully to server at ${new Date()}`);
    console.log(`Datastore API Server is listening on port ${port} at  ${new Date()}`);
});


const shutdown = (signal) => {
    if (!signal) {
        console.log(`API Server shutting down at ${new Date()}`);
    } else {
        console.log(`Signal ${signal} : API Server shutting down at ${new Date()}`);
    }
    server.close(function () {
        console.log(`Signal ${signal} : API Server is shutting down database server at ${new Date()}`);
        client.close();
        process.exit(0);
    })
};
process.on('SIGTERM', function () {
    shutdown('SIGTERM');
});

dispatcher.onGet("/", async (req, res) => {
    res.writeHead(501, {'Content-Type': 'application/json'});
    const obj =  {service: 'datastore', message: "Not Implemented"};
    const str = JSON.stringify(obj);
    console.log(str);
    res.end(str);
});

dispatcher.onDelete("/", async (req, res) => {
    res.writeHead(501, {'Content-Type': 'application/json'});
    const obj =  {service: 'datastore', message: "Not Implemented"};
    const str = JSON.stringify(obj);
    console.log(str);
    res.end(str);
});

dispatcher.onPost("/", async (req, res) => {
    res.writeHead(501, {'Content-Type': 'application/json'});
    const obj =  {service: 'datastore', message: "Not Implemented"};
    const str = JSON.stringify(obj);
    console.log(str);
    res.end(str);
});

module.exports = {server, shutdown};