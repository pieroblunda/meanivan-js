var fs = require('fs');
var UglifyJS = require("uglify-js");
var GlobArray = require("glob-array");
var i18nJsonEsEs = require('../client/i18n/es-ES.json');
var i18nJsonEnUs = require('../client/i18n/en-US.json');
var i18nJsonPtBr = require('../client/i18n/pt-BR.json');

// Uglify vendor
var patterns = [
  'node_modules/angular/angular.js',
  'node_modules/angular-sanitize/angular-sanitize.js',
  'node_modules/angular-messages/angular-messages.js',
  'node_modules/angular-translate/dist/angular-translate.js',
];
var globOptions = {}; // any regular node-glob option
var files = GlobArray.sync(patterns, globOptions);
var uglified = UglifyJS.minify(files).code;

fs.writeFile('public/js/vendor.min.js', uglified, function (err) {
  if (err) return console.log(err);
  console.log('Done!  public/css/vendor.min.js');
});

// -------------------------------
// Uglify app js
// -------------------------------
var patternsB = [
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
  console.log('Done! Dictionarly writed');
});

var globOptionsB = {}; // any regular node-glob option
var filesB = GlobArray.sync(patterns, globOptions);
var uglifiedB = UglifyJS.minify(files).code;
// Espanol
fs.writeFile('public/js/app-EN.min.js', uglifiedB, function (err) {
  if (err) return console.log(err);
  console.log('Done!  public/js/app-EN.min.js');
});
