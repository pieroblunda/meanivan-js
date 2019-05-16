'use strict';
angular.module('App').config([
  '$stateProvider',
  '$urlRouterProvider',
  function( $stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('root', {
    abstract: true,
    url: '/root'
  })
  .state('root.visual-editor', {
    url: '^/editor',
    views: {
      '@': {
        templateUrl: '/views/visual-editor'
      }
    },
    resolve: {
      'navigate': ['Navigation', function(Navigation){
        Navigation.go('visual-editor');
      }]
    }
  });

  $urlRouterProvider.otherwise( '/editor' );

}])
.run(['$state', function($state){
  $state.defaultErrorHandler(function(error){
    if (!error){
      return;
    }
    var rejection = error.detail;
    if (angular.isObject(rejection) && angular.isString(rejection.redirect) && rejection.redirect.includes('root.')) {
      $state.go(rejection.redirect, rejection.params || {}, {reload: true});
    }
  });
}]);
