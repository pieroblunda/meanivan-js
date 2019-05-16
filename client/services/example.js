'use strict';
angular.module('App').service('Example', [
'$http',
function($http) {
  
  var self = this;

  /**
  @jsDoc
  @name Example
  @description Lorem ipsum dolor sit amet consectetur adipisicing elit.
  @param foo, Required:true, Expect:Array
  @return String
  @example Example.test();
  */
  self.setter = function(data){
    return $http.post('/api/example/setter', data).then(function(response){
      return response.data;
    });
  };
  
  /**
  @jsDoc
  @name Example
  @description Lorem ipsum dolor sit amet consectetur adipisicing elit.
  @param foo, Required:true, Expect:Array
  @return String
  @example Example.test();
  */
  self.getter = function(data){
    return $http.get('/api/example/getter').then(function(response){
      return response;
    });
  };
  
  /**
  @jsDoc
  @name findById
  @description Lorem ipsum dolor sit amet consectetur adipisicing elit.
  @param foo, Required:true, Expect:Array
  @return String
  @example Example.test();
  */
  self.findById = function(data){
    return $http.get('/api/example/getter').then(function(response){
      return response;
    });
  };

}]);