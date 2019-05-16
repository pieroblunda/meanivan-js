'use strict';
angular.module('App').controller('landingController', [
  '$scope',
  'Landing',
  function($scope, Landing) {

    $scope.Landing = Landing;
    
    // WebFont.load({
    //   google: {
    //     families: [
    //       'Lato',
    //       'Roboto'
    //     ]
    //   }
    // });
  }
]);