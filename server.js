/* @ToDo: https://expressjs.com/es/advanced/best-practice-performance.html#code */
/* @ToDo: https://blog.cloud66.com/installing-nginx-and-http-2-in-your-local-development-environment/ */
'use strict';
const app = require('express')(),
      environment = require('./server/environment'),
      dbclient = require('./server/dbclient'),
      routes = require('./server/routes'),
      dotenv = require('dotenv'),
      Meanivan = require('./framework/meanivan.js'),
      appRootDir = require('app-root-dir').get(),
      colors = require('colors');

module.exports.init = function(){
  console.log('=============================================================');
  console.log('Starting HTTP server');
  console.log('=============================================================');

  // Init environment variables configuration
  Meanivan.setEnvironment().then(function(returl){
    dotenv.config();
    
    // Init DB connection
    process.env.BASEPATH = appRootDir;
    process.env.SERVERPATH = appRootDir + '/server';
    process.env.VIEWSPATH = appRootDir + '/client/views';

    let dbConfig = {
      dbName: process.env.DBNAME
    };
    dbclient.connect(dbConfig, function(err){

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

      app.listen(process.env.PORT, function(){
        console.log(colors.green('✓') + ' Environment:     ' + process.env.NODE_ENV);
        console.log(colors.green('✓') + ' Database:        ' + process.env.DBNAME);
        console.log(colors.green('✓') + ' Port:            ' + process.env.PORT);
        console.log(colors.green('\nVisit:         http://localhost:' + process.env.PORT + '\n'));
      });

    });
  });
};
