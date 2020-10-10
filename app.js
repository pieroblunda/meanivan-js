const dotenv = require('dotenv');
var conf = dotenv.config();
process.env.BASE_PATH = __dirname;
process.env.SERVER_PATH = process.env.BASE_PATH + '/server';
process.env.VIEWS_PATH = process.env.BASE_PATH + '/client/views';
var server = require('./server.js');

if(!conf){
  console.log('ERROR! No such file or directory, ".env" in the base directory');
  process.exit(1);
}

server.init();
