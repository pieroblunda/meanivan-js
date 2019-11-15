'use strict';
var languageParser = require('accept-language-parser');


module.exports.load = function(req, res) {
  res.render('landing', {
    lang: languageParser.pick(['es', 'en', 'pt'], req.headers['accept-language']) || 'es',
    isDevelopment: true
  });
};

module.exports.notFound = function(err, req, res, next) {
  if (err) {
    console.log('Route error: ', err.stack);
    res.status(404).send('Error');
  }
};
