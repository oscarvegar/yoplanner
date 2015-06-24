var yoPlannerApp = angular.module('yoPlannerApp', ['rfp-module','autocomplete', 'ngRoute', 'ui.router', 'ngAnimate', 'ngStorage', 'yoPlannerApp.hotel']);

yoPlannerApp.run(function($rootScope, $state, $stateParams) {
	// It's very handy to add references to $state and $stateParams to the $rootScope
	// so that you can access them from any scope within your applications.For example,
	// <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
	// to active whenever 'contacts.list' or one of its decendents is active.
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});

yoPlannerApp.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
	/*
	$routeProvider
		.when('/', {
			templateUrl: 'ng/modules/homepage.tpl.html',
			controller: 'HomePageController',
			resolve: {
				// I will cause a 1 second delay
				delay: function($q, $timeout) {
					var delay = $q.defer();
					$timeout(delay.resolve, 1000);
					return delay.promise;
				}
			}
		})
		.otherwise({
			redirectTo: '/'
		});
	
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	*/
	/////////////////////////////
	// Redirects and Otherwise //
	/////////////////////////////

	// Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
	$urlRouterProvider
	// The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
	// Here we are just setting up some convenience urls.
		.when('/c?id', '/contacts/:id')
		.when('/user/:id', '/contacts/:id')

	// If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
	.otherwise('/');

	//////////////////////////
	// State Configurations //
	//////////////////////////

	// Use $stateProvider to configure your states.
	$stateProvider
		.state('index', {
			url: "",
			templateUrl: "ng/modules/homepage.tpl.html",
			controller: "AutocompleteController"
		})
		.state('index2', {
			url: "/",
			templateUrl: "ng/modules/homepage.tpl.html",
			controller: "AutocompleteController"
		});
	
});

yoPlannerApp.controller('AutocompleteController',function($scope,$http,$timeout,$rootScope, $location, $state, $localStorage){
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
		$http.get("/search/cities/"+typed).success(function(data){
            $scope.cities  =  [];
            if(data.autocomplete == null)return;
            for(var i=0;i<data.autocomplete.length;i++){
                $scope.cities.push(data.autocomplete[i].id+" "+data.autocomplete[i].name);
            }
        });
	}

	$scope.searchCity = function(selected){
		console.info("SEL CITY",$scope.searchId);
		/*
		$http.get("/recinto/findByCiudadId/"+$scope.searchId).success(function (data){
			$rootScope.resHoteles = data.hotels;
			console.info($rootScope.resHoteles);
			// $state.go('hotel.list');
		});
		*/
		// $location.url('/hotel/list/' + $scope.searchId);
		$rootScope.searchId = $scope.searchId;
		$rootScope.$selectedCity = selected.replace($scope.searchId, '').trim();
		$state.go('hotel', {searchId: $rootScope.searchId});
	}
});
/*
yoPlannerApp.controller('HomePageController',function($scope,$http,$timeout,$rootScope, $location, $state) {
	console.log('HomePageController');
	// $state = 'index';
});
*/
