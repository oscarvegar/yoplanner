angular.module('yp-index', []) 
  .directive('index', function() {
    return {
        restrict: 'E',
        templateUrl: 'modules/info.html'
    };
  });

