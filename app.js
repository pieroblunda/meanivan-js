const dotenv = require('dotenv');
var conf = dotenv.config();
process.env.BASE_PATH = __dirname;
process.env.SERVER_PATH = process.env.BASE_PATH + '/server';
process.env.VIEWS_PATH = process.env.BASE_PATH + '/client/views';
var server = require('./server.js');

if(conf.error){
  console.log('ERROR! No such file or directory, ".env" in the base directory');
  console.log('run $ cp framework/files-templates/.env-template .env');
  process.exit(1);
}

server.init();
