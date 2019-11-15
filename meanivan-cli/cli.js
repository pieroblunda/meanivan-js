#!/usr/bin/env node
/* @ToDo: Add a tutorial to make the script configurable */
// https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e
const fs = require('fs'),
      replaceInFile = require('replace-in-file'),
      appRootDir = require('app-root-dir').get(),
      colors = require('colors'),
      help = require('./help.js'),
      routesFile = appRootDir + '/server/routes.js',
      scriptsFile = appRootDir + '/client/views/scripts.jade',
      params = process.argv.splice(2);

var outputArray = [];

// help
console.log(params);
if(params[0] === 'help'){
  help.show();
}

// Main program
if(params[0] === 'new'){

  var inputName = params[2];
  var modelName = {
    capitalized: inputName.charAt(0).toUpperCase() + inputName.slice(1),
    lowercase: inputName.toLowerCase(),
    plural: inputName.toLowerCase() + 's'
  };

  switch (params[1]) {
    case 'servermodule':
      newBackendModel(modelName);
      newBackendControler(modelName);
      newRoutes(modelName);
      break;
    case 'clientController':
      newClientController(modelName);
      break;
    case 'clientService':
      newClientService(modelName);
      break;
    case 'directive':
      newDirective(modelName);
      break;
    default:
        console.log('Do you need help?');
  }
}

function newRoutes(){
  // Include the references
  var insertingText;
  var fileContent = fs.readFileSync(routesFile);

  insertingText = modelName.lowercase + 'Controller = require(process.env.SERVER_PATH + \'/controllers/'+modelName.lowercase+'.server.controller\'),';
  if(fileContent.indexOf(insertingText) === -1){
    replaceInFile.sync({
      files: routesFile,
      from: /\/\/-\s@CLI-routes-ctrlImport/,
      to: modelName.lowercase + 'Controller = require(process.env.SERVER_PATH + \'/controllers/'+modelName.lowercase+'.server.controller\'),\n\t\t\t\/\/- @CLI-routes-ctrlImport'
    });
  }

  // Add the API getter
  insertingText = 'app.get(\'/api/'+modelName.lowercase+'/getter\', '+modelName.lowercase+'Controller.getter);';
  if(fileContent.indexOf(insertingText) === -1){
    replaceInFile.sync({
      files: routesFile,
      from: /\/\/-\s@CLI-app-getter-setter/,
      to: 'app.get(\'/api/'+modelName.lowercase+'/getter\', '+modelName.lowercase+'Controller.getter);\n\t\/\/- @CLI-app-getter-setter'
    });
  }

  // Add the API setter
  insertingText = 'app.get(\'/api/'+modelName.lowercase+'/setter\', bodyParser.json(), '+modelName.lowercase+'Controller.setter);';
  if(fileContent.indexOf(insertingText) === -1){
    replaceInFile.sync({
      files: routesFile,
      from: /\/\/-\s@CLI-app-getter-setter/,
      to: 'app.post(\'/api/'+modelName.lowercase+'/setter\', bodyParser.json(), '+modelName.lowercase+'Controller.setter);\n\t\/\/- @CLI-app-getter-setter'
    });
  }

  /*
  outputArray.push({
    type: 'diff',
    message: [
      '/client/controllers/'+ctrlName+'.js',
      scriptsFile.replace(appRootDir, '')
    ]
  });
  */
}

/*
New backend model
@Usage: $ pbcli new servermodel «controller name»
*/
function newBackendControler(modelName){

  // Variables
  var fileTemplate = appRootDir + '/meanivan-cli/files-templates/backend.controller.js';
  var fileController = appRootDir + '/server/controllers/'+modelName.lowercase+'.server.controller.js'

  // sanitize the name
  /* @ToDo: is necesary to sanitize de input */

  // Create de file & replate de mockText
  fs.copyFileSync(fileTemplate, fileController);
  replaceInFile.sync({
    files: fileController,
    from: /MyNewServerModelLowercase/g,
    to: modelName.lowercase
  });
  replaceInFile.sync({
    files: fileController,
    from: /MyNewServerModelCapitalized/g,
    to: modelName.capitalized
  });
  outputArray.push({
    type: 'newFile',
    message: [
      fileController.replace(appRootDir, '')
    ]
  });

  // Print output
  printOutput();
}

/*
New backend model
@Usage: $ pbcli new servermodel «controller name»
*/
function newBackendModel(modelName){

  // Variables
  var fileTemplate = appRootDir + '/meanivan-cli/files-templates/backend.model.js';
  var fileController = appRootDir + '/server/models/'+modelName.lowercase+'.server.model.js'

  // sanitize the name
  /* @ToDo: is necesary to sanitize de input */

  // Create de file & replate de mockText
  fs.copyFileSync(fileTemplate, fileController);
  replaceInFile.sync({
    files: fileController,
    from: /MyNewServerModelLowercase/g,
    to: modelName.lowercase
  });
  replaceInFile.sync({
    files: fileController,
    from: /MyNewServerModelCapitalized/g,
    to: modelName.capitalized
  });
  outputArray.push({
    type: 'newFile',
    message: [
      fileController.replace(appRootDir, '')
    ]
  });

  // Print output
  printOutput();
}

/*
NEW CLIENT CONTROLLER
@Usage: $ pbcli new clientController «controller name»
*/
function newClientController(ctrlName){

  // Variables
  var fileTemplate = appRootDir + '/meanivan-cli/files-templates/frontend.controller.js';
  var fileController = appRootDir + '/client/controllers/'+modelName.lowercase+'.js';
  var insertingText, fileContent;

  // sanitize the name
  /* @ToDo: is necesary to sanitize de input */

  // Create de file & replate de mockText
  fs.copyFileSync(fileTemplate, fileController);
  replaceInFile.sync({
    files: fileController,
    from: 'MyNewClientControllerCapitalized',
    to: modelName.lowercase + 'Controller'
  });
  outputArray.push({
    type: 'newFile',
    message: [
      fileController.replace(appRootDir, '')
    ]
  });

  // Add file to scripts
  fileContent = fs.readFileSync(scriptsFile);
  insertingText = 'script(src="/client/controllers/'+modelName.lowercase+'.js")';
  if(fileContent.indexOf(insertingText) === -1){
    replaceInFile.sync({
      files: scriptsFile,
      from: /\/\/-\s@CLI-controllers/,
      to: 'script(src="/client/controllers/'+modelName.lowercase+'.js")\n\t//- @CLI-controllers'
    });
  }

  // Print output
  printOutput();
}

/*
NEW CLIENT CONTROLLER
@Usage: $ pbcli new clientController «controller name»
*/
function newClientService(modelName){

  // Variables
  var fileTemplate = appRootDir + '/meanivan-cli/files-templates/frontend.service.js';
  var fileTarget = appRootDir + '/client/services/'+modelName.lowercase+'.js'

  // sanitize the name
  /* @ToDo: is necesary to sanitize de input */

  // Create de file & replate de mockText
  fs.copyFileSync(fileTemplate, fileTarget);
  replaceInFile.sync({
    files: fileTarget,
    from: /MyNewServiceModelCapitalized/g,
    to: modelName.capitalized
  });
  replaceInFile.sync({
    files: fileTarget,
    from: /MyNewServiceModelLowercase/g,
    to: modelName.lowercase
  });

  fileContent = fs.readFileSync(scriptsFile);
  insertingText = 'script(src="/client/controllers/'+modelName.lowercase+'.js")';
  if(fileContent.indexOf(insertingText) === -1){
    replaceInFile.sync({
      files: scriptsFile,
      from: /\/\/-\s@CLI-services/,
      to: 'script(src="/client/services/'+modelName.lowercase+'.js")\n\t//- @CLI-services'
    });
  }

  // Add file to scripts
  /*
  outputArray.push({
    type: 'diff',
    message: [
      '/client/controllers/'+ctrlName+'.js',
      scriptsFile.replace(appRootDir, '')
    ]
  });
  */

  /* @ToDo: Add test */

  // Print output
  printOutput();
}

/*
NEW CLIENT CONTROLLER
@Usage: $ pbcli new clientController «controller name»
*/
function newDirective(modelName){

  // Variables
  var fileTemplate = appRootDir + '/meanivan-cli/files-templates/frontend.directive.js';
  var fileTarget = appRootDir + '/client/services/'+modelName.lowercase+'.js'

  // sanitize the name
  /* @ToDo: is necesary to sanitize de input */

  // Create de file & replate de mockText
  fs.copyFileSync(fileTemplate, fileTarget);
  replaceInFile.sync({
    files: fileTarget,
    from: /MyNewDirective/g,
    to: modelName.capitalized
  });

  // Add file to scripts
  /*
  outputArray.push({
    type: 'diff',
    message: [
      '/client/controllers/'+ctrlName+'.js',
      scriptsFile.replace(appRootDir, '')
    ]
  });
  */

  /* @ToDo: Add test */

  // Print output
  printOutput();
}

function printOutput(){
  console.log('');
  outputArray.forEach(function(item, index){
    switch (item.type) {
      case 'newFile':
        console.log(colors.green('✓') + ' New file created: ' + item.message[0]);
        break;
      case 'diff':
        console.log(colors.green('+ script(src="'+item.message[0]+'") ') + item.message[1]);
        break;
      default:

    }
  });
  console.log('\nCheck results by «git diff»\n');
}
