'use strict';
const express = require('express'),
      bodyParser = require('body-parser'),
			landingController = require(process.env.SERVER_PATH + '/controllers/landing.server.controller'),
			exampleController = require(process.env.SERVER_PATH + '/controllers/example.server.controller'),
			//- @CLI-routes-ctrlImport
      serverResponse = require(process.env.SERVER_PATH + '/middlewares/server-response');


module.exports.init = function(app) {

  app.use('/public', express.static(process.env.BASE_PATH + '/public'));
  app.use(serverResponse);
  app.use('/api/', bodyParser.json());
  /* @ToDo: [1] La pagina de 404 no esta andando */
  app.use(landingController.notFound); // 404 page

  // Para usar los sourcemaps durante el desarrollo
  if (process.env.NODE_ENV === 'development') {
    app.use('/client', express.static(process.env.BASE_PATH + '/client'));
  }

  app.get('/', landingController.load);

  /* @ToDo: Hacer test de que tienen que existir estos comentarios para que puda funcionar el CLI */
	app.get('/api/example/getter', exampleController.getter);
	app.post('/api/example/setter', exampleController.setter);
	//- @CLI-app-getter-setter

};
