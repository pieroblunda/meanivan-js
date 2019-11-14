'use strict';
const environment = require('./environment');
const MongoClient = require('mongodb').MongoClient;

var state = {
  db: null
};

exports.connect = function(dbConfig, done) {
  if (state.db) {
    return done();
  }

  let url = 'mongodb://localhost:27017/' + dbConfig.dbName

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
