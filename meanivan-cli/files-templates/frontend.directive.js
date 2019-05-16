/**
@jsDoc
@name MyNewDirective
@description This is a description
@param data-max-value, Required:false, Expect:Integer
@param data-min-value, Required:true, Expect:Integer
@example
```html
<span>This is an example</span>
```
@author Unknow
@deprecated
*/
'use strict';
angular.module('App').directive('MyNewDirective', [
function() {
  return {
    restrict: 'A',
    link: function(scope, element, attr, ctrl) {
      // My code goes here
    }
  };
}]);