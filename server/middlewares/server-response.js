'use strict';

module.exports = function(req, res, next) {


  //- /* @ToDo: Payload se envia cuando esta vacio */
  res.responseOk = function(payload) {
    res.send({
      status: 'ok',
      payload: payload || {},
      error: null
    });
  };

  res.responseError = function(msg) {
    console.log(msg);
    //- /* @ToDo: Flexibilizar para usar status mas descriptivos  */
    res.status(500).send({
      status: 'error',
      payload: null,
      error: {
        msg: msg
      }
    });
  };

  next();
};