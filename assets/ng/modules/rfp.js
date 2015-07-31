angular.module('yp-rfp', []) 
  .directive('rfp', function() {
    return {
        restrict: 'E',
        templateUrl: '/ng/modules/rfp.html'
    };
  });