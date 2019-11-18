'use strict';
const db = require(process.env.BASE_PATH + '/framework/dbclient');
const ObjectID = require('mongodb').ObjectID;
const Example = function() {

  const model = {
    getter: getter,
    setter: setter
  };

  function getter(inputObj){
    /* @ToDo: List only explicit doc attributes */
    /* @ToDo: Add support for pagination */
    return new Promise(function(resolve, reject) {
      db.get().collection('example').find({}).toArray(function(err, items) {
        if (err) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  }

  function findById(id){
    return db.get().collection('example').findOne({
      _id: id
    });
  }

  function setter(inputObj){
    return new Promise(function(resolve, reject) {
      db.get().collection('example').insertOne(inputObj, function (error, response) {
        if(error) {
          reject(error);
        }else{
          resolve(response.ops[0]);
        }
      });
    });
  }

  return model;

};

module.exports = new Example();
