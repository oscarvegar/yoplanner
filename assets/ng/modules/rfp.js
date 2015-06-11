angular.module('yp-rfp', []) 
  .directive('rfp', function() {
    return {
        restrict: 'E',
        templateUrl: 'modules/rfp.html'
    };
  });