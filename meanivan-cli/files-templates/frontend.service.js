'use strict';
angular.module('App').service('MyNewServiceModelCapitalized', [
'$http',
function($http) {
  
  var self = this;

  /**
  @jsDoc
  @name MyNewServiceModelCapitalized
  @description Lorem ipsum dolor sit amet consectetur adipisicing elit.
  @param foo, Required:true, Expect:Array
  @return String
  @example MyNewServiceModelCapitalized.test();
  */
  self.setter = function(data){
    return $http.get('/api/MyNewServiceModelLowercase/setter').then(function(response){
      return response;
    });
  };

}]);