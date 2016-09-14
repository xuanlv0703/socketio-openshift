#!/bin/env node

// Setup basic express server
var express = require('express');
var app = express();

// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

var server = require('http').Server(app);
var io = require('socket.io')(server);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var serverStat;

server.listen(port, ipaddress, function() {
    serverStat = new Date() + ' Server is listening on ' + ipaddress + " : " + port;
    console.log(serverStat);
});
console.log(server);

// Routing
app.use(express.static(__dirname + '/public'));


// respond with "hello world" when a GET request is made to the homepage
app.get('/_server', function(req, res) {
    console.log(serverStat);
    res.send(serverStat);
});

// app.get('/_server/stats', function(req, res) {
//     var stats = "Apps:" + JSON.stringify(apps);
//     console.log(stats);
//     res.send(stats);
// });

//
// var apps = {};


io.on('connection', function(socket) {
    console.log(socket.id + ": connected.");
    socket.emit('data','xuanlv');
    // socket.on('news',function(res){
    //     console.log(res);
    // })

});
