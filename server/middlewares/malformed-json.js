'use strict';
module.exports = {

  malformedJson: function(err, req, res, next) {
    if (err && err.name === 'SyntaxError') {
      // Wrap error
      console.log(err);
      res.responseError('Malformed JSON');
    } else {
      next(err);
    }
  }

};