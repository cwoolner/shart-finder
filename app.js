var path = require('path');
var express = require('express');
var config = require('config');

var app = express();

app.use(express.static(path.join(__dirname, "./app/")));

app.listen(config.server.port);
console.log("Listening for requests on", config.server.port);