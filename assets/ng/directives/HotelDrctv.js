/*
 *
 */
'use strict';

var HotelModule = angular.module('yoPlannerApp.hotel');

HotelModule.directive('snglKrsl', function($timeout, $log){
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
		// template: ''
		templateUrl: '/ng/directives/sngl-krsl.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			$log.info('directive.snglKrsl', iAttrs.pictures);
		}
	};
});

HotelModule.directive('tstmnlsKrsl', function($timeout, $log) {
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			reviews: '='
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: ''
		templateUrl: '/ng/directives/tstmnls-krsl.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			$log.info('directive.tstmnlsKrsl', iAttrs.reviews);
			
		}
	};
});

HotelModule.directive('onFinishRender', function($timeout, $log) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            // if (scope.$last === true) {
            if (scope.$last) {
                $timeout(function () {
                	$log.info("onFinishRender.calling :: "+attr.onFinishRender);
                    var expressionHandler = scope.$eval(attr.onFinishRender);
                    // scope.$emit('ngRepeatFinished');
                    // scope.$evalAsync(attr.onFinishRender);
                    // scope.$eval(attr.onFinishRender);
				    setTimeout( function() {

		                //=================================== Carousel Services  ==============================//    
		                $("#single-carousel, #single-carousel-sidebar").owlCarousel({

		                    // Most important owl features
		                    // items : 1,
		                    singleItem: true,

		                    //Autoplay
		                    autoPlay: 4000,

		                    // Navigation
		                    navigation : true,

		                    // Navigation
		                    autoHeight : true,

		                    //Basic Speeds
		                    slideSpeed : 400,

		                    //Pagination
		                    pagination : false
		                });

			        }, 1500);
                });
            }
        }
    };
});

HotelModule.directive('onFinishRenderTest', function($timeout, $log) {
    return {
        restrict: 'A',
        scope: { method: '&onFinishRenderTest' },
        link: function (scope, element, attr) {
            // if (scope.$last === true) {
            if (scope.$last || scope.$parent.$last) {
                $timeout(function () {
                	$log.info("onFinishRenderTest.calling :: "+attr.onFinishRenderTest);
                   
                    
                    scope.$eval(attr.onFinishRenderTest);
				                
	    			setTimeout( function() {
	                    //=================================== Carousel testimonials  ===============================//
	                    $("#testimonials").owlCarousel({
	                        items : 1,
	                        autoPlay: 3200,  
	                        navigation : false,
	                        autoHeight : true,
	                        slideSpeed : 400,
	                        singleItem: true,
	                        pagination : true
	                    });
        			}, 1500);
                });
            }
        }
    };
});
