'use strict';
angular.module('App', ['ngSanitize', 'ngMessages', 'ui.router', 'pascalprecht.translate'])
.run(['$rootScope', '$translate', '$timeout', function ($rootScope, $translate, $timeout) {
  $translate.use('current');
  $rootScope._ = window._;
}]).config(['$translateProvider', 'DICTIONARY', function($translateProvider, DICTIONARY) {
  
  $translateProvider.useSanitizeValueStrategy('escape');
  $translateProvider.translations('current', DICTIONARY);
  
}]);