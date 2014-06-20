var mongoose  = require('mongoose');
var dbConfig  = require('config').db;

var conn = mongoose.connection;

function Connection(){}

Connection.prototype.connect = function(cb){
  conn.once('open', cb);
  mongoose.connect(dbConfig.conn);
};

Connection.prototype.isConnected = function(){
  return conn.db && conn.db.openCalled;
};

module.exports = new Connection();
