var fs = require('fs');
var UglifyJS = require("uglify-js");
var GlobArray = require("glob-array");
var i18nJsonEsEs = require('../client/i18n/es-ES.json');
var i18nJsonEnUs = require('../client/i18n/en-US.json');
var i18nJsonPtBr = require('../client/i18n/pt-BR.json');

// Uglify vendor
var patternsVendor = [
  'node_modules/angular/angular.js',
  'node_modules/angular-sanitize/angular-sanitize.js',
  'node_modules/angular-messages/angular-messages.js',
  'node_modules/angular-translate/dist/angular-translate.js',
];
var globOptions = {}; // any regular node-glob option
var filesVendor = GlobArray.sync(patternsVendor, globOptions);
var allCodeStringVendor = '';

filesVendor.forEach((file, i) => {
  allCodeStringVendor += fs.readFileSync(file, "utf8");
});

var uglified = UglifyJS.minify(allCodeStringVendor).code;

fs.writeFile('public/js/vendor.min.js', uglified, function (err) {
  if (err) return console.log(err);
  console.log('Done!  public/js/vendor.min.js');
});


// -------------------------------
// Uglify app js
// -------------------------------
var patternsApp = [
  'client/app.js',
  'client/services/*.js',
  'client/directives/*.js',
  'client/filters/*.js',
  'client/controllers/*.js',
  'client/constants/*.js'
];

var ngDictionary = `angular.module('App').constant('DICTIONARY', ${JSON.stringify(i18nJsonEsEs)});`;
fs.writeFile('client/constants/dictionary.js', ngDictionary, function (err) {
  if (err) return console.log(err);
  console.log('Done!  Dictionarly writed');
});

var filesApp = GlobArray.sync(patternsApp, globOptions);
var allCodeStringApp = '';
filesApp.forEach((file, i) => {
  allCodeStringApp += fs.readFileSync(file, "utf8");
});
var uglifiedApp = UglifyJS.minify(allCodeStringApp).code;

// English
fs.writeFile('public/js/app-EN.min.js', uglifiedApp, function (err) {
  if (err) return console.log(err);
  console.log('Done!  public/js/app-EN.min.js');
});
