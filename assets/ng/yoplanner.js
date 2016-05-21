var yoPlannerApp = angular.module('yoPlannerApp', ['rfp-module','autocomplete', 'ngRoute', 'ui.router', 'ngAnimate',
	'ngStorage', 'yoPlannerApp.hotel', 'twitter.timeline']);

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

		}).catch(function(err){
			$http.get("http://admin.yoplanner.com/hs").success(function(sd){
				console.debug("SESSION ON YPADM")
				console.log("sd",sd)
				$http.post("/login",{username:sd,password:"123"}).success(function(data){
					$rootScope._hasSession = true;
				}).catch(function(err){
					console.error(err);
					swal("¡Error!", "Usuario y/o contraseña incorrectos. \n Intenta nuevamente", "error");
				})
			}).error(function(err){
				console.debug("NO SESSION ON YP")
			})
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
			$rootScope._hasSession = true;
		}).catch(function(ex){
			console.error(ex);
			swal("¡Error!","Usuario y/o contraseña incorrectos","error")		
		})

	}


	$scope.init();

});