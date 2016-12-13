var yoPlannerApp = angular.module('yoPlannerApp', [
	'ngSails',
	'rfp-module',
	'autocomplete',
	'ngRoute',
	'ui.router',
	'ngAnimate',
	'ngStorage',
	'yoPlannerApp.hotel',
	'twitter.timeline',
	'angularMoment',
	'jkuri.timepicker',
	'angucomplete-alt',
	'jkuri.gallery',
	'monospaced.elastic',
	'ui.bootstrap',
	'ngFileUpload',
	'youtube-embed',
	'djds4rce.angular-socialshare',
	'satellizer'
]);

yoPlannerApp.run(function($rootScope, $state, $stateParams, $location, $http, $FB) {
	$FB.init('1817741651841161');
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	$rootScope._hasSession = false;


	$rootScope.hasSession = function() {
		$http.get('/hs').success(function(hs) {
			$rootScope._hasSession = true;

		}).error(function(err) {
			console.log('HS', err);
		})
	}


	$rootScope.logout = function() {
		console.log("logout")
		$http.get('/logout').success(function(hs) {

			console.log("logout", hs);
			$rootScope._hasSession = false

		}).catch(function(err) {
			console.log("err", err)
		})
	}

	$rootScope.hasSession();

	$http.get('/auth/getLoggedUser').success(function(data) {
		console.log('LOGGED USER', data);
		$rootScope._user = data;
	});
});

yoPlannerApp.config(function($routeProvider, $locationProvider, $stateProvider,
	$urlRouterProvider, $httpProvider, $sailsProvider, $authProvider) {

		$authProvider.linkedin({
			clientId: '78w80b3w1y1la8',
			url: '/user/getLinkedinToken', //Llega acá después para sacar el token y regresar la info
		  authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
		  redirectUri: 'http://localhost:1337/user/registerLinkedin', //Primero llega a este con el CODE
		  requiredUrlParams: ['state'],
		  scope: ['r_basicprofile', 'r_emailaddress'],
		  state: 'STATE',
		  oauthType: '2.0',
		  popupOptions: { width: 527, height: 582 }
		});

	$httpProvider.defaults.withCredentials = true;
	//$sailsProvider.url = 'http://localhost:1337';
	$sailsProvider.url = 'http://admin.yoplanner.com';
});

yoPlannerApp.controller('NotificacionesCtrl', function($scope, $state, $http, $sails, $rootScope) {
	$scope.initNotis = function() {
			$http.get('/notificacion/getNotifications').success(function(data) {
				console.log('Get onotificacions', data);
				$scope.notificaciones = data.notis;
			});
			$sails.get('http://admin.yoplanner/api/notificacion/subscribe').success(function(data) {
				//$sails.get('http://localhost:1337/api/notificacion/subscribe').success(function(data) {
				console.log(data);
				$rootScope.sails_env = data.env;
			}).error(function(err) {
				console.log(err);
			});
		}
		//Manage Sockets
	$sails.on('notificacionsocket', function(msg) {
		console.log(msg);
		if (msg.room == 'hotel-comment') {
			$scope.notificaciones.push(msg.notificacion);
		}
	});
});

yoPlannerApp.controller('AutocompleteController', function($scope, $http, $timeout, $rootScope, $location, $state,
	$localStorage, HotelSrvc) {

	$scope.searchString;
	$scope.doneTypingInterval = 500;
	$scope.typingTimer;
	$scope.findCities = function(typed) {
		if (typed.length == 0) {
			$scope.cities = [];
			return;
		}
		if (typed.length < 4) return;
		clearTimeout($scope.typingTimer);
		$scope.typingTimer = setTimeout(function() {
			$scope.doneTyping(typed)
		}, $scope.doneTypingInterval);

	};
	$scope.doneTyping = function(typed) {
		$scope.showLoader = true;
		var tmpTyped = encodeURIComponent(typed);
		$http.get("/search/cities/" + tmpTyped)
			.success(function(data) {
				$scope.cities = [];
				if (data.autocomplete == null) return;
				for (var i = 0; i < data.autocomplete.length; i++) {
					$scope.cities.push(data.autocomplete[i].id + " " + data.autocomplete[i].name);
				}
				$scope.showLoader = false;
			})
			.error(function(data, status, headers, config) {
				$scope.showLoader = false;
			});
	}

	$scope.searchCity = function(selected) {
		if ($scope.isWidget) {
			$scope.searchString = null;
			window.open("/search/findByCityCode/" + $scope.searchId, '_blank');
		} else {
			window.location = "/search/findByCityCode/" + $scope.searchId;
		}
	}
});

yoPlannerApp.controller('HomePageController', function($scope, $http, $timeout, $rootScope, $location, $state, $log, $q, HotelSrvc) {


	$scope.getLastFive = function () {
		$http.get('/ComentarioHotel/getLastFive').then(function(data) {
		  $scope.lastFiveComments = data.data;
			setTimeout(function () {
				$("#testimonials").owlCarousel({
							items : 5,
							autoPlay: 3200,
							navigation : false,
							autoHeight : true,
							slideSpeed : 400,
							singleItem: true,
							pagination : true
					});
			}, 100);

		});
	}

	$scope.init = function() {

	};

	$scope.$evalAsync(function() {
		$scope.init();
	});
});


yoPlannerApp.controller('LoginCtrl', function($scope, $http, $rootScope) {
	$scope.init = function() {

	}

	$scope.login = function() {
		$http.post("/login", $scope.usr).then(function(data) {
			$rootScope._user = data.data.user;
			$rootScope._hasSession = true;
		}).catch(function(ex) {
			console.error(ex);
			swal("¡Error!", "Usuario y/o contraseña incorrectos", "error")
		})

	}


	$scope.init();

});

yoPlannerApp.directive('inputStars', function() {

	var directive = {

		restrict: 'EA',
		replace: true,
		template: '<ul ng-class="listClass">' +
			'<li ng-touch="paintStars($index)" ng-mouseenter="paintStars($index, true)" ng-mouseleave="unpaintStars($index, false)" ng-repeat="item in items track by $index">' +
			'<i  ng-class="getClass($index)" ng-click="setValue($index, $event)"></i>' +
			'</li>' +
			'</ul>',
		require: 'ngModel',
		scope: {
			ngModel: '='
		},

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
		scope.readonly = !(attrs.readonly === undefined);

		ngModelCtrl.$render = function() {

			scope.last_value = ngModelCtrl.$viewValue || 0;

		};

		scope.getClass = function(index) {

			return index >= scope.last_value ? iconBase + ' ' + emptyIcon : iconBase + ' ' + fullIcon + ' active ';

		};

		scope.unpaintStars = function($index, hover) {

			scope.paintStars(scope.last_value - 1, hover);

		};

		scope.paintStars = function($index, hover) {

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

		scope.setValue = function(index, e) {

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
