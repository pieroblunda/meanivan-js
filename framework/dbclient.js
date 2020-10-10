// @TODO: http://mongodb.github.io/node-mongodb-native/3.3/tutorials/connect/
//- Cambiar el connector a mongodb
'use strict';
const MongoClient = require('mongodb').MongoClient;

var state = {
  db: null
};

exports.connect = function(done) {
  if (state.db) {
    return done();
  }

  //- @TODO: do nor support load balancer
  let url = 'mongodb://localhost:27017/' + process.env.DB_NAME;

  MongoClient.connect(url, function(err, db) {
    if (err) {
      return done(err);
    }
    state.db = db;
    done();
  });
};

exports.get = function() {
  return state.db;
};
