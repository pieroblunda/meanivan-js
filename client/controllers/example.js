'use strict';
angular.module('App').controller('exampleController', [
'$scope',
'Example',
function($scope, Example) {

  Example.getter().then(function(result){
    $scope.examples = result.data;
  });
  
  $scope.setterExample = function(){
    Example.setter({
      foo: 'foo',
      bar: 'bar'
    }).then(function(doc){
      $scope.examples.push(doc);
    });
  };

}]);