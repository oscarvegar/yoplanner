/*
 *
 */
'use strict';

var HotelModule = angular.module('yoPlannerApp.hotel', ['ngRoute', 'ui.router', 'ngAnimate', 'ngStorage', 'uiGmapgoogle-maps', 'youtube-embed', 'cgNotify']);

HotelModule.constant('MONGOLAB_CONFIG', {
	baseUrl: '/databases/',
	dbName: 'ascrum'
});

//TODO: move those messages to a separate module
HotelModule.constant('I18N.MESSAGES', {
	'errors.route.changeError': 'Route change error',
	'crud.user.save.success': "A user with id '{{id}}' was saved successfully.",
	'crud.user.remove.success': "A user with id '{{id}}' was removed successfully.",
	'crud.user.remove.error': "Something went wrong when removing user with id '{{id}}'.",
	'crud.user.save.error': "Something went wrong when saving a user...",
	'crud.project.save.success': "A project with id '{{id}}' was saved successfully.",
	'crud.project.remove.success': "A project with id '{{id}}' was removed successfully.",
	'crud.project.save.error': "Something went wrong when saving a project...",
	'login.reason.notAuthorized': "You do not have the necessary access permissions.  Do you want to login as someone else?",
	'login.reason.notAuthenticated': "You must be logged in to access this part of the application.",
	'login.error.invalidCredentials': "Login failed.  Please check your credentials and try again.",
	'login.error.serverError': "There was a problem with authenticating: {{exception}}."
});

HotelModule.run(function($rootScope, $state, $stateParams) {
	// It's very handy to add references to $state and $stateParams to the $rootScope
	// so that you can access them from any scope within your applications.For example,
	// <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
	// to active whenever 'contacts.list' or one of its decendents is active.
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});

HotelModule.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
	/*
	$routeProvider
		.when('/hotel/:hotelId', {
			templateUrl: '/ng/modules/hotel.detail.tpl.html',
			controller: 'HotelController',
			resolve: {
				// I will cause a 1 second delay
				delay: function($q, $timeout) {
					var delay = $q.defer();
					$timeout(delay.resolve, 1000);
					return delay.promise;
				}
			}
		})
		.when('/hotel/list/:searchId', {
			templateUrl: '/ng/modules/hotel.list.tpl.html',
			controller: 'HotelController',
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
		.state('hotel', {
			url: "/hotel/:searchId",
			templateUrl: "ng/modules/hotel.list.tpl.html",
			controller: "HotelController"
		})
		.state('hotel_detail', {
			url: "/hotel/:searchId/detail/:hotelId",
			templateUrl: "ng/modules/hotel.detail.tpl.html",
			controller: "HotelController"
		});

	/////////////////////////////////
	// GoogleMapApi Configurations //
	/////////////////////////////////

	// Google Maps SDK Async Loader
	uiGmapGoogleMapApiProvider.configure({
		// key: 'your api key',
		v: '3.17',
		libraries: 'weather,geometry,visualization'
	});
	
});

HotelModule.controller('HotelController', function($scope, $http, $log, $timeout, $rootScope, $route, $routeParams, $state, $stateParams, $localStorage, uiGmapGoogleMapApi, uiGmapIsReady, notify) {
	$log.info('HotelController');
	$scope.Math = window.Math;
	$scope.$storage = $localStorage;
    $rootScope.hotelesSeleccionados = $scope.$storage.hotelesSeleccionados!=null?JSON.parse($scope.$storage.hotelesSeleccionados):[];

	$scope.findAllHotelsByCity = function(searchId) {
		searchId = searchId ? searchId : ($rootScope.searchId ? $rootScope.searchId : $stateParams.searchId);
		$http.get("/recinto/findByCiudadId/"+searchId).success(function (data){
			$rootScope.resHoteles = data.hotels;
            $scope.currentPage=1;
			$log.info($rootScope.resHoteles);
			$scope.hotels = $rootScope.resHoteles;
			$log.info($scope.hotels);
			// $state.go('hotel.list');
			// $location.url('/hotel/list/' + $scope.searchId);
		});
	};

	$scope.masResultados = function(){
		var searchId = $rootScope.searchId ? $rootScope.searchId : $stateParams.searchId;
		$scope.showMostrarMas = true;
		$http.get("/recinto/findByCiudadId/"+searchId+"?p="+$scope.currentPage).success(function (data){
			$scope.showMostrarMas = false;
			$log.info(data);
			$scope.hotels = $scope.hotels.concat(data.hotels);
			if(data.hotels && data.hotels.length > 0) {
				$scope.currentPage++;
			}
		}).error(function (err){
			$log.error(err);
			$scope.showLoader = false;
		});
        
    };

    $scope.selectResult = function(hotel) {
    	$log.info('HotelController.selectResult');
    	$rootScope.selectedHotel = hotel;
    	$log.info(hotel);
/*
	 	if($rootScope.selectedHotel.salones==null) {
	        $http.get("/salonrecinto/findByRecintoId/"+$rootScope.selectedHotel.id).success(function(data){
	        	$log.info("SALONES > > > >",data)
	        	$rootScope.selectedHotel.salones = data;

		        if($rootScope.selectedHotel.infoExtra==null) {
			        $http.get("/infoExtraRecinto/findByRecintoId/"+$rootScope.selectedHotel.id).success(function(data){
			        	$log.info("INFO EXTRA > > > >",data)
			        	$rootScope.selectedHotel.infoExtra = data;
			        	//document.getElementById("buscadorbox").scrollIntoView();

			        	$state.go('hotel_detail', {searchId: hotel.cityId, hotelId: hotel.id});

			        }).error(function(err){
			        	$log.error(err);
			        })
			    }

	        }).error(function(err){
	        	$log.error(err);
	        })
	    }
*/
    };

    $scope.findSelectedHotelDetail = function() {
    	$log.info('HotelController.findSelectedHotelDetail');
    	$scope.videoID = '9GdVZfIBvxQ';
    	$scope.videoURL = 'https://www.youtube.com/watch?v=9GdVZfIBvxQ';
    	$scope.playerVars = {
		    controls: 1,
		    autoplay: 0
		};

		var searchId = searchId ? searchId : ($rootScope.searchId ? $rootScope.searchId : $stateParams.searchId);
		var hotelId = hotelId ? hotelId : ($rootScope.hotelId ? $rootScope.hotelId : $stateParams.hotelId);

        $http.get("/recinto/findById/"+hotelId).success(function(data){
        	$log.info("SELECTED HOTEL SEARCH > > > >", data);
    		$log.info("SELECTED HOTEL ROOT_SCOPE > > > >", $rootScope.selectedHotel);

        	if(data) {
	        	if(data.hotels.length > 0) {
	        		var hotelTMP = data.hotels[data.hotels.length-1];

	        		$scope.initilizeGooMap(hotelTMP);

	        		if($rootScope.selectedHotel) {
		        		hotelTMP["amenities"] = $rootScope.selectedHotel.amenities;
		        		hotelTMP["fotoPrincipal"] = $rootScope.selectedHotel.fotoPrincipal;
		        		hotelTMP["reviewSummary"] = $rootScope.selectedHotel.reviewSummary;
	        		}

	        		$rootScope.selectedHotel = hotelTMP;
	        	}
	        	
	        	if(data.salones && data.salones.length > 0) {
	        		$rootScope.selectedHotel.salones = data.salones[data.salones.length-1];
	        	}

	        	if(data.infoExtra && data.infoExtra.length > 0) {
	        		$rootScope.selectedHotel.infoExtra = data.infoExtra[data.infoExtra.length-1];
	        	}

	 			$scope.currentHotel = $rootScope.selectedHotel;

			 	if($rootScope.selectedHotel.salones==null) {
			        $http.get("/salonrecinto/findByRecintoId/"+$rootScope.selectedHotel.id).success(function(data){
			        	$log.info("SALONES > > > >", data);
			        	$rootScope.selectedHotel.salones = data;
			        }).error(function(err){
			        	$log.error(err);
			        });
			    }

		        if($rootScope.selectedHotel.infoExtra==null) {
			        $http.get("/infoExtraRecinto/findByRecintoId/"+$rootScope.selectedHotel.id).success(function(data){
			        	$log.info("INFO EXTRA > > > >", data);
			        	$rootScope.selectedHotel.infoExtra = data[data.length-1];
			        }).error(function(err){
			        	$log.error(err);
			        });
			    }
        	}

        }).error(function(err){
        	$log.error(err);
        });

    };

    $scope.initilizeGooMap = function(hotelTMP) {

		// Map Initial Location
		var initLatitude = hotelTMP.geoLocation.latitude;
		var initLongitude = hotelTMP.geoLocation.longitude;
		var initFullAddress = hotelTMP.address.fullAddress + (hotelTMP.address.postalCode ? ', C. P. ' + hotelTMP.address.postalCode : '');
		
		$scope.marker = {
			id: 1,
			latitude: initLatitude,
			longitude: initLongitude,
			icon: "/img/img-theme/pin.png",
			options: {
				animation: 1
			}
		};
		$scope.map = {
			center: {
				latitude: initLatitude+0.015,	//	y's
				longitude: initLongitude-0.05	//	x's
				// latitude: initLatitude,	//	y's
				// longitude: initLongitude	//	x's
			},
			options: {
				disableDefaultUI: !0,
				mapTypeControl: !1
			},
			showMap: false,
			zoom: 14,
			markers: [
				{
					id: 1,
					icon: '../img/img-theme/pin.png',
					latitude: initLatitude,
					longitude: initLongitude,
					showWindow: false,
					options: {
						animation: 1
					},
					info: {
						coords: {
							latitude: initLatitude,
							longitude: initLongitude
						},
						options: {
							boxClass: 'custom-info-window',
							closeBoxDiv: '<div" class="pull-right" style="position: relative; cursor: pointer; margin: -20px -15px;">X</div>',
							disableAutoPan: true
						},
						show: true,
						hotel: {
							name: hotelTMP.name,
							fullAddress: initFullAddress
						}
					}
				}
			]
		};

    };

	$scope.renderMap = function(showMap) {
		// alert('renderMap :: ' + showMap);
		// $scope.initilizeGooMap($rootScope.selectedHotel);
		if(!showMap) {
			$scope.map.showMap = !showMap;
		}
		
		setTimeout(function () {
			if($scope.map.getGMap) {
				google.maps.event.trigger($scope.map.getGMap(), "resize");
			}
		}, 1000);
		
	}

    $scope.agregarYRegresar = function() {
    	$log.info('Hotel agregado a Mi Selección');
    	notify('Hotel agregado a Mi Selección');

        $rootScope.hotelesSeleccionados.push($scope.currentHotel);
        $scope.$storage.hotelesSeleccionados = JSON.stringify($rootScope.hotelesSeleccionados);
    };

    $rootScope.existeEnSeleccion = function(hotel){
    	$log.info("HOTEL>>>>>>>>>>>>>>>>",hotel);
    	$log.info("SELS>>>>>>>>>>>>>>>>",$rootScope.hotelesSeleccionados);
    	if(hotel==null)return -1;
        for(var i=0;i<$rootScope.hotelesSeleccionados.length;i++){
            if(hotel.id == $rootScope.hotelesSeleccionados[i].id){
                return i;
            };
        };
        return -1;
    }; 

    $rootScope.deleteSelection = function(hotel){
        $rootScope.hotelesSeleccionados.splice($scope.existeEnSeleccion(hotel),1);
        $scope.$storage.hotelesSeleccionados = JSON.stringify($rootScope.hotelesSeleccionados);
    };

	$scope.init = function() {
		$log.info('HotelController.init');
		$scope.map = {showMap: false};
		$log.info($routeParams.searchId);
		$log.info($routeParams.hotelId);
		// $scope.params.kuponId
		$log.info($rootScope.searchId);
		$log.info($stateParams.searchId);
		$log.info($rootScope.$selectedCity);
		$log.info($stateParams.hotelId);

		if($rootScope.$selectedCity) {
			// $scope.$storage.selectedCity = $rootScope.$selectedCity;
			/*
			if($scope.$storage) {
				$scope.$storage.selectedCity = $rootScope.$selectedCity;
			} else {
				$scope.$storage = $localStorage.$default({
					selectedCity: $rootScope.$selectedCity
				});
			}
			*/
			$scope.$storage = $localStorage.$default({
				selectedCity: $rootScope.$selectedCity
			});
		} else {
			$rootScope.$selectedCity = $scope.$storage.selectedCity;
		}

 		if($routeParams.hotelId || $rootScope.hotelId || $stateParams.hotelId) {
 			// $log.info('$rootScope.selectedHotel');
 			// $log.info($rootScope.selectedHotel);
 			// $scope.currentHotel = $rootScope.selectedHotel;
 			$scope.findSelectedHotelDetail();
		} else if($routeParams.searchId || $rootScope.searchId || $stateParams.searchId) {
			$scope.findAllHotelsByCity($routeParams.searchId);
		}
	};

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function(maps) {
    	$log.info('maps', maps);
    	// maps.visualRefresh = true;
    });

    uiGmapIsReady.promise(1).then(function(instances) {
		if($scope.map.getGMap) {
			google.maps.event.trigger($scope.map.getGMap(), "resize");
		}

        instances.forEach(function(inst) {
            var map = inst.map;
            var uuid = map.uiGmap_id;
            var mapInstanceNumber = inst.instance; // Starts at 1.
        });
    });

	$scope.$evalAsync(function() {
		$log.info('HotelController.$evalAsync');
		$scope.init();
	});
});
/*
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
		*
		template: '                <div id="single-carousel">'
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
				+ '                </div>',
		*
		templateUrl: '/ng/directives/sngl-krsl.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			*
			$scope.$watch(iAttrs.pictures, function(value) {
				setTimeout(function() {
					// only if we have images since .slidesjs() can't
					// be called more than once
					console.log("attrs.start is:");
					console.dir(iAttrs.start);
					if (value.length > 0) {
			            //=================================== Carousel Services  ==============================//    
			            $("#single-carousel, #single-carousel-sidebar").owlCarousel({
			                items : 1,
			                autoPlay: 4000,  
			                navigation : true,
			                autoHeight : true,
			                slideSpeed : 400,
			                singleItem: true,
			                pagination : false
			            });
					}
				}, 1);
			});
			*
		}
	}
});
*/
