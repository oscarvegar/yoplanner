angular.module('yp-hoteles', []) 
  .directive('hoteles', function() {
    return {
        restrict: 'E',
        templateUrl: 'modules/hoteles.html'
    };
  });