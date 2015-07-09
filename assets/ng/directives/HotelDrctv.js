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
		// template: ''
		templateUrl: '/ng/directives/sngl-krsl.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			console.log(iAttrs.pictures);
		}
	};
});

HotelModule.directive('tstmnlsKrsl', function(){
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
			console.log(iAttrs.reviews);
		}
	};
});

HotelModule.directive('onFinishRender', function ($timeout, $log) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            // if (scope.$last === true) {
            if (scope.$last) {
                $timeout(function () {
                	$log.info("calling :: "+attr.onFinishRender);
                    // scope.$emit('ngRepeatFinished');
                    // scope.$evalAsync(attr.onFinishRender);
                    // scope.$eval(attr.onFinishRender);
				    setTimeout( function() {
				    	var index = 0;
				        $('#single-carousel').imagesLoaded()
				            .always( function() {
				                console.log('always.(#single-carousel)');
				                $('.preloader').fadeOut('slow');
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
				            })
				            .progress( function( instance, image ) {
				                console.log('progress...');
				                // console.log($('.preloader'));
				                if(index == 0) {
				                	$('.preloader').fadeIn('slow');
				                	index++;
				                }
				            });
				        }, 1000);
                });
            }
        }
    }
});
