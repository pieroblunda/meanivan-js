require('dotenv').config();
process.env.BASE_PATH = __dirname;
process.env.SERVER_PATH = process.env.BASE_PATH + '/server';
process.env.VIEWS_PATH = process.env.BASE_PATH + '/client/views';
var server = require('./server.js');
server.init();
