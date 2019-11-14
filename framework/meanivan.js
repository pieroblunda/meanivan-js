const fs = require('fs'),
      colors = require('colors');

const Meanivan = function() {

  const model = {
    setEnvironment: setEnvironment
  };

  function setEnvironment(){
    return new Promise(function(resolve, reject) {
      const path = process.cwd() + '/.env';
      fs.exists(path, function(exists) {
        console.log(colors.green('✓') + ' Environment variables loaded succesfully');
        if (!exists) {
          fs.copyFile('framework/files-templates/.env-template', '.env', (err) => {
            if (err) throw err;
            console.log(colors.yellow('✗ Environment configuration file was created in the root directory with the default options.'));
            console.log(colors.yellow('  Please, check each variable value at .env file'));
          });
        }
        resolve();
      });
    });
  }
  return model;
};

module.exports = new Meanivan();
