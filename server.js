/* @ToDo: https://expressjs.com/es/advanced/best-practice-performance.html#code */
/* @ToDo: https://blog.cloud66.com/installing-nginx-and-http-2-in-your-local-development-environment/ */
'use strict';
const app = require('express')(),
      dbclient = require('./framework/dbclient'),
      routes = require('./server/routes'),
      colors = require('colors');

module.exports.init = function(){
  console.log('=============================================================');
  console.log('Starting HTTP server');
  console.log('=============================================================');

  // Init DB connection
  let dbConfig = {
    dbName: process.env.DB_NAME
  };
  dbclient.connect(dbConfig, function(err){

    if(err){
      console.log(colors.red('✗') + ' Error on mongodb connection: ', err);
      return false;
    }

    console.log(colors.green('✓') + ' Connected to mongodb succesfully');

    // App Config
    app.set('view engine', 'pug');
    app.set('views', process.env.VIEWS_PATH);
    app.set('json spaces', 2);

    //Route
    routes.init(app);

    app.listen(process.env.PORT, function(){
      console.log(colors.green('✓') + ' Environment:     ' + process.env.NODE_ENV);
      console.log(colors.green('✓') + ' Database:        ' + process.env.DB_NAME);
      console.log(colors.green('✓') + ' Port:            ' + process.env.PORT);
      console.log(colors.green('\nVisit:         http://localhost:' + process.env.PORT + '\n'));
    });

  });
};
