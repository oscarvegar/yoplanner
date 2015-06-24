/*
 *
 */
'use strict';

var HotelModule = angular.module('yoPlannerApp.hotel');

HotelModule.directive('snglKrsl', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			pictures: '='
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '                <!-- Single Carousel-->'
		/*
				+ '                <div id="single-carousel">'
				+ '	                <div class="owl-wrapper-outer autoHeight">'
				+ '		                <div class="owl-wrapper">'
				+ '			                <div class="owl-item" ng-repeat="pic in pictures">'
				+ '			                    <div class="img-hover">'
				+ '			                        <div class="overlay"> <a ng-href="{{pic}}" class="fancybox" rel="gallery"></a></div>'
				+ '			                        <img ng-src="{{pic}}" alt="" class="img-responsive">'
				+ '			                    </div>'
				+ '			            	</div>'
				+ '		            	</div>'
				+ '	            	</div>'
				+ '                </div>'
				+ '                <!-- End Single Carousel-->',
		*/
		templateUrl: '/ng/directives/sngl-krsl.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			console.log(iAttrs.pictures);
		}
	};
});
