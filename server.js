/* @ToDo: JADE -> Pug */
/* @ToDo: https://expressjs.com/es/advanced/best-practice-performance.html#code */
/* @ToDo: https://blog.cloud66.com/installing-nginx-and-http-2-in-your-local-development-environment/ */
'use strict';
const app = require('express')(),
      environment = require('./server/environment'),
      dbclient = require('./server/dbclient'),
      routes = require('./server/routes'),
      colors = require('colors');

module.exports.init = function(){
  console.log('=============================================================');
  console.log('Starting HTTP server');
  console.log('=============================================================');
    
  // Init DB connection
  dbclient.connect(environment.mongoUrl, function(err){

    if(err){
      console.log(colors.red('✗') + ' Error on mongodb connection: ', err);
      return false;
    }
    
    console.log(colors.green('✓') + ' Connected to mongodb succesfully');
    
    // App Config
    app.set('view engine', 'pug');
    app.set('views', environment.viewsPath);
    app.set('json spaces', environment.jsonSpaces);
    
    //Route
    routes.init(app);
    
    app.listen(environment.port, function(){
      console.log(colors.green('✓') + ' Environment:     ' + process.env.NODE_ENV, colors.red(environment.warning));
      console.log(colors.green('✓') + ' Database:        ' + environment.dbName);
      console.log(colors.green('✓') + ' Port:            ' + environment.port);
      console.log(colors.green('\nVisit:         http://localhost:' + environment.port + '\n'));
    });
    
  });
};