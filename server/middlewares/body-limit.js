'use strict';
module.exports = function(){
  var self = this;
  this.limit = 2;
  
  this.setLimit = function (nlimit) {
    if(!nlimit){
      return;
    }
    self.limit = nlimit;
  };
  
  return {
    limit: self.limit,
    setLimit: self.setLimit,
    check: function(req, res, next){
      if(req.headers['content-length']!== undefined && parseInt(req.headers['content-length'])>(self.limit * 1000 * 1000)) {
        res.responseError('Tu template excede el tamaño máximo permitido de '+self.limit+'Mb');
      } else {
        next();
      }
    }
  };
};