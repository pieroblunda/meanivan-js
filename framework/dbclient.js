const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var state = {
  db: null
};

exports.connect = function(cb) {
  if (state.db) {
    return cb();
  }

  // Connection URL
  //- @TODO: do nor support load balancer
  const url = 'mongodb://localhost:27017';
  const dbName = process.env.DB_NAME;

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    state.db = client.db(dbName);
    //client.close();
    cb();
  });

};

exports.get = function() {
  return state.db;
};
