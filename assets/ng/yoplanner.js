var yoPlannerApp = angular.module('yoPlannerApp', ['rfp-module','autocomplete', 'ngRoute', 'ui.router', 'ngAnimate',
	'ngStorage', 'yoPlannerApp.hotel', 'twitter.timeline', 'angularMoment', 'jkuri.timepicker',
	'angucomplete-alt', 'jkuri.gallery', 'monospaced.elastic', 'ui.bootstrap', 'youtube-embed']);

yoPlannerApp.run(function($rootScope, $state, $stateParams,$location,$http) {
	// It's very handy to add references to $state and $stateParams to the $rootScope
	// so that you can access them from any scope within your applications.For example,
	// <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
	// to active whenever 'contacts.list' or one of its decendents is active.
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	$rootScope._hasSession = false;


	$rootScope.hasSession = function(){
		$http.get('/hs').success(function(hs){
			$rootScope._hasSession = true;

		})
	}


	$rootScope.logout = function(){
		console.log("logout")
		$http.get('/logout').success(function(hs){

			console.log("logout",hs);
			$rootScope._hasSession = false

		}).catch(function(err){
			console.log("err",err)
		})
	}

	$rootScope.hasSession();
});

yoPlannerApp.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider,$httpProvider) {

	$httpProvider.defaults.withCredentials = true;


});

yoPlannerApp.controller('AutocompleteController',function($scope, $http, $timeout, $rootScope, $location, $state,
	$localStorage, HotelSrvc){

	$scope.searchString;
	$scope.doneTypingInterval = 500;
	$scope.typingTimer;
    $scope.findCities = function(typed){
        if(typed.length==0){
        	$scope.cities  =  [];
        	return;
        }
        if(typed.length<4)return;
        clearTimeout($scope.typingTimer);
        $scope.typingTimer = setTimeout(function(){$scope.doneTyping(typed)}, $scope.doneTypingInterval);

	};
	$scope.doneTyping = function(typed){
		$scope.showLoader = true;
		var tmpTyped = encodeURIComponent(typed);
		$http.get("/search/cities/"+tmpTyped)
			.success(function(data){
	            $scope.cities  =  [];
	            if(data.autocomplete == null)return;
	            for(var i=0;i<data.autocomplete.length;i++){
	                $scope.cities.push(data.autocomplete[i].id+" "+data.autocomplete[i].name);
	            }
				$scope.showLoader = false;
	        })
	        .error(function(data, status, headers, config) {
				$scope.showLoader = false;
			});
	}

	$scope.searchCity = function(selected){


		console.log("$scope.searchId",$scope.searchId);
		window.location = "/search/findByCityCode/"+$scope.searchId;
	}
});

yoPlannerApp.controller('HomePageController', function($scope, $http, $timeout, $rootScope, $location, $state, $log, $q, HotelSrvc) {
	$log.info('HomePageController');


	$scope.init = function() {
		$log.info('HomePageController.init');

	};

	$scope.$evalAsync(function() {
		$log.info('HomePageController.$evalAsync');
		$scope.init();
	});
});


yoPlannerApp.controller('LoginCtrl',function($scope,$http,$rootScope){
	$scope.init=function(){

	}

	$scope.login = function(){
		$http.post("/login",$scope.usr).then(function(data){
			$rootScope._user = data.data.user;
			$rootScope._hasSession = true;
		}).catch(function(ex){
			console.error(ex);
			swal("¡Error!","Usuario y/o contraseña incorrectos","error")
		})

	}


	$scope.init();

});

yoPlannerApp.directive('inputStars', function () {

        var directive = {

            restrict: 'EA',
            replace: true,
            template: '<ul ng-class="listClass">' +
            '<li ng-touch="paintStars($index)" ng-mouseenter="paintStars($index, true)" ng-mouseleave="unpaintStars($index, false)" ng-repeat="item in items track by $index">' +
            '<i  ng-class="getClass($index)" ng-click="setValue($index, $event)"></i>' +
            '</li>' +
            '</ul>',
            require: 'ngModel',
            scope: { ngModel: '='},

            link: link

        };

        return directive;

        function link(scope, element, attrs, ngModelCtrl) {

            scope.items = new Array(+attrs.max);

            var emptyIcon = attrs.iconEmpty || 'fa-star-o';
            var iconHover = attrs.iconHover || 'angular-input-stars-hover';
            var fullIcon = attrs.iconFull || 'fa-star';
            var iconBase = attrs.iconBase || 'fa fa-fw';
            scope.listClass = attrs.listClass || 'angular-input-stars';
            scope.readonly  = ! (attrs.readonly === undefined);

            ngModelCtrl.$render = function () {

                scope.last_value = ngModelCtrl.$viewValue || 0;

            };

            scope.getClass = function (index) {

                return index >= scope.last_value ? iconBase + ' ' + emptyIcon : iconBase + ' ' + fullIcon + ' active ';

            };

            scope.unpaintStars = function ($index, hover) {

                scope.paintStars(scope.last_value - 1, hover);

            };

            scope.paintStars = function ($index, hover) {

                //ignore painting, if readonly
                if (scope.readonly) {
                    return;
                }
                var items = element.find('li').find('i');

                for (var index = 0; index < items.length; index++) {

                    var $star = angular.element(items[index]);

                    if ($index >= index) {

                        $star.removeClass(emptyIcon);
                        $star.addClass(fullIcon);
                        $star.addClass('active');
                        $star.addClass(iconHover);

                    } else {

                        $star.removeClass(fullIcon);
                        $star.removeClass('active');
                        $star.removeClass(iconHover);
                        $star.addClass(emptyIcon);

                    }
                }

                !hover && items.removeClass(iconHover);

            };

            scope.setValue = function (index, e) {

                //ignore painting
                if (scope.readonly) {
                    return;
                }
                var star = e.target;

                if (e.pageX < star.getBoundingClientRect().left + star.offsetWidth / 2) {
                    scope.last_value = index + 1;
                } else {
                    scope.last_value = index + 1;
                }

                ngModelCtrl.$setViewValue(scope.last_value);

            };

        }

    });
