'use strict';
const environment = require('./environment'),
      express = require('express'),
      colors = require('colors'),
      bodyParser = require('body-parser'),
			landingController = require(environment.serverPath + '/controllers/landing.server.controller'),
			exampleController = require(environment.serverPath + '/controllers/example.server.controller'),
			//- @CLI-routes-ctrlImport
      serverResponse = require(environment.serverPath + '/middlewares/server-response'),
      bodyLimit = require(environment.serverPath + '/middlewares/body-limit'),
      malformedJson = require(environment.serverPath + '/middlewares/malformed-json');


module.exports.init = function(app) {

  app.use('/public', express.static(environment.basePath + '/public'));
  app.use(serverResponse);
  app.use('/api/', bodyParser.json());
  /* @ToDo: [1] La pagina de 404 no esta andando */
  app.use(landingController.notFound); // 404 page
  
  // Para usar los sourcemaps durante el desarrollo
  if (environment.development) {
    app.use('/client', express.static(environment.basePath + '/client'));
  }

  app.get('/', landingController.load);
  
  /* @ToDo: Hacer test de que tienen que existir estos comentarios para que puda funcionar el CLI */
	app.get('/api/example/getter', exampleController.getter);
	app.post('/api/example/setter', exampleController.setter);
	//- @CLI-app-getter-setter

};
