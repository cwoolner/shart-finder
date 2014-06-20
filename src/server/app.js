var path    = require("path");
var express = require('express');
var config  = require('config');
var db      = require('./db');
var router  = require('./router');

var app = express();

app.configure(function(){
  app.set("views", __dirname + "/views");
  app.set("view engine", "jade");
  app.use(express.static(path.join(__dirname, "../../app")));
  app.use(express.urlencoded());
  app.use(express.json());
});

var router = new router();
router.configure(app);

db.connect(function(){
  app.listen(config.server.port);
  console.log("Listening for requests on", config.server.port);
});
