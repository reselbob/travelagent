const express = require('express');
const app = express();
const port = process.env.APP_PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const {getUser, getUsers} = require('./datastore');

app.get('/users/search', async (req, res) => {
    res.send('Not Implemented');
});

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