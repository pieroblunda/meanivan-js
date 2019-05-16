'use strict';
const appRootDir = require('app-root-dir').get(),
      fs = require('fs'),
      path = require('path');

const Environment = function() {

  var environment = {};
  environment.warning = '';
  environment.basePath = appRootDir;
  environment.serverPath = environment.basePath + '/server';
  environment.viewsPath = environment.basePath + '/client/views';
  
  switch (process.env.NODE_ENV) {
    case 'development':
      environment.development = true;
      environment.port = 3000;
      environment.dbName = 'meanivan';
      environment.mongoUrl = 'mongodb://localhost:27017/' + environment.dbName;
      environment.pretty = true;
      environment.jsonSpaces = 2;
      break;
      
    case 'testing':
      environment.development = false;
      environment.port = 3001;
      environment.dbName = 'meanivan';
      environment.mongoUrl = 'mongodb://localhost:27017/' + environment.dbName;
      environment.pretty = false;
      environment.jsonSpaces = 0;
      break;
      
    case 'production':
      environment.development = false;
      environment.port = 3000;
      environment.dbName = null;
      environment.pretty = false;
      environment.jsonSpaces = 0;
      
      // Load the db string connection from file at ~/.pb-framework-conf
      // Linux: HOME, Windows: USERPROFILE
      var pathFile = path.resolve(process.env.HOME || process.env.USERPROFILE, '.meanivan-conf');
      var serverConfig = JSON.parse(fs.readFileSync(pathFile, 'utf8'));
      environment.mongoUrl = serverConfig.mongoUrl;
      break;
      
    default:
      environment.development = true;
      environment.warning = 'WARNING! NODE_ENV not defined. Dev environment is used by default';
      break;
  }
  
  return environment;

};

module.exports = new Environment();