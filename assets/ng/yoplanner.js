var yoPlannerApp = angular.module('yoPlannerApp', ['rfp-module','autocomplete', 'ngRoute', 'ui.router', 'ngAnimate', 'ngStorage', 'yoPlannerApp.hotel', 'twitter.timeline']);

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
			templateUrl: "ng/modules/homepage.tpl.html"
		})
		.state('index2', {
			url: "/",
			templateUrl: "ng/modules/homepage.tpl.html"
		})
		.state('acerca_de', {
			url: "/acerca-de",
			templateUrl: "ng/modules/acerca.de.tpl.html"
		})
		.state('nuestros_servicios', {
			url: "/nuestros-servicios",
			templateUrl: "ng/modules/nuestros.servicios.tpl.html"
		})
		.state('mrktng_hoteles', {
			url: "/mrktng-hoteles",
			templateUrl: "ng/modules/mrktng.hoteles.tpl.html"
		})
		.state('meetings', {
			url: "/meetings",
			templateUrl: "ng/modules/meetings.tpl.html"
		})
		.state('travel_agency', {
			url: "/travel-agency",
			templateUrl: "ng/modules/travel.agency.tpl.html"
		})
		.state('influencer', {
			url: "/influencer",
			templateUrl: "ng/modules/influencer.tpl.html"
		})
		.state('reserva', {
			url: "/reserva/:option",
			templateUrl: "ng/modules/embedded.site.tpl.html"
		})
		.state('cruises', {
			url: "/cruises",
			templateUrl: "ng/modules/cruises.tpl.html"
		})
		.state('contact', {
			url: "/contact",
			templateUrl: "ng/modules/contact.tpl.html"
		})
		.state('politicas_privacidad', {
			url: "/politicas-privacidad",
			templateUrl: "ng/modules/politicas.privacidad.tpl.html"
		});
	
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

		var valDest = HotelSrvc.validateDestination($rootScope.searchId);
		if(valDest != null) {
			$state.go('hotel.review', {searchId: $rootScope.searchId});
		} else {
			$state.go('hotel', {searchId: $rootScope.searchId});
		}
	}
});

yoPlannerApp.controller('HomePageController', function($scope, $http, $timeout, $rootScope, $location, $state, $log, $q, HotelSrvc) {
	$log.info('HomePageController');

	$scope.initServicesItems = function() {
		var CotizaGrupoObj = {icon: 'fa-group', text: 'Cotiza Grupo', stUrl: 'index'};
		var ReservaHotelObj = {icon: 'fa-bed', text: 'Reserva Hotel', stUrl: 'reserva({option: "hotels"})'};
		var ReservaAvionObj = {icon: 'fa-plane', text: 'Reserva Avión', stUrl: 'reserva({option: "flights"})'};
		var BuscaCruceroObj = {icon: 'fa-ship', text: 'Busca Crucero', stUrl: 'cruises'};
		var BuscaParqueObj = {icon: 'fa-magic', text: 'Busca Parque'};
		var BuscaRestauranteObj = {icon: 'fa-spoon', text: 'Busca Restaurante'};
		var DescubreBlogObj = {icon: 'fa-blog-blue-34px', text: 'Descubre Blog', url: 'http://www.yoplanner.com.mx/blog/'};
		var ContáctanosObj = {icon: 'fa-contact-us-blue-34px', text: 'Contáctanos', stUrl: 'contact'};

		$scope.servicesItems = new Array();
		$scope.servicesItems = $scope.servicesItems.concat(CotizaGrupoObj, ReservaHotelObj, ReservaAvionObj, BuscaCruceroObj, BuscaParqueObj, BuscaRestauranteObj, DescubreBlogObj, ContáctanosObj);
	};

	$scope.extractHotelData = function (dataResult) {
		if(dataResult && dataResult.hotels && dataResult.hotels.length > 0) {
			var tempHotel = dataResult.hotels[dataResult.hotels.length - 1];
			tempHotel['destName'] = HotelSrvc.getHomepageHotelComp(tempHotel.id);
			tempHotel['starRatingRange'] = new Array(tempHotel.starRating);
			return tempHotel;
		}
		return null;
	};

	$scope.initVacationsDestinatios = function() {
		HotelSrvc.homepageHotels().then(function(data){
			$log.info('data-result', data);
			$log.info(data[0].data, data[1].data, data[2].data, data[3].data);

			$scope.popDestImgInf = new Array();
			$scope.popDestImgInf = $scope.popDestImgInf.concat($scope.extractHotelData(data[0].data), $scope.extractHotelData(data[1].data));
			$log.info('popDestImgInf', $scope.popDestImgInf);

			$scope.popDestInfImg = new Array();
			$scope.popDestInfImg = $scope.popDestInfImg.concat($scope.extractHotelData(data[2].data), $scope.extractHotelData(data[3].data));
			$log.info('popDestInfImg', $scope.popDestInfImg);
		});
	};

	$scope.init = function() {
		$scope.initServicesItems();
		$scope.initVacationsDestinatios();
	};

	$scope.$evalAsync(function() {
		$log.info('HomePageController.$evalAsync');
		$scope.init();
	});
});

yoPlannerApp.controller('ContactController', function($scope, $http, $timeout, $rootScope, $location, $state, $log, uiGmapIsReady) {
	$log.info('ContactController');

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
				// latitude: initLatitude+0.015,	//	y's
				// longitude: initLongitude-0.05	//	x's
				latitude: initLatitude,	//	y's
				longitude: initLongitude	//	x's
			},
			options: {
				disableDefaultUI: !0,
				mapTypeControl: !0,
				panControl: !0,
				scaleControl: !0,
				scrollwheel: 0,
				streetViewControl: !0,
				zoomControl: !0
			},
			showMap: true,
			zoom: 17,
			markers: [
				{
					id: 1,
					icon: '/img/img-theme/pin.png',
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
							fullAddress: initFullAddress,
							phContact: hotelTMP.contact
						}
					}
				}
			]
		};

    };

	$scope.init = function() {
		$log.info('ContactController.init');

		var YoPlannerData = {
			name: 'Yo Planner, S.A. de C.V.',
			contact: '(55) 6274 - 6291',
			geoLocation: {
				latitude: 19.4432395,
				longitude: -99.2020841
			},
			address: {
				fullAddress: 'Lago Andromaco 53 int. 1303 \
								Col. Ampliación Granada \
								Del. Miguel Hidalgo\
								México, D. F.\
								C. P. 11520 '
			}
		};
		$scope.initilizeGooMap(YoPlannerData);
	};

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
		$log.info('ContactController.$evalAsync');
		$scope.init();
	});
});

yoPlannerApp.controller('DespegarEmbeddedController', function($scope, $http, $timeout, $rootScope, $location, $stateParams, $log, $sce) {
	$log.info('DespegarEmbeddedController');

	$scope.init = function() {
		$log.info('DespegarEmbeddedController.init');
		$log.info($stateParams.option);

		// $scope.despegarYoPlannerURL = $sce.trustAsResourceUrl('ng/modules/whitelabel.html?home=' + $stateParams.option);
		$scope.despegarYoPlannerURL = 'ng/modules/whitelabel.html?home=' + $stateParams.option;
		$log.info($scope.despegarYoPlannerURL);

		var titleOptions = {
			flights: 'Avión',
			hotels: 'Hotel',
			packages: 'Paquete'
		}
		$scope.titleOption = titleOptions[$stateParams.option];
		$log.info($scope.titleOption);
    };

	$scope.$evalAsync(function() {
		$log.info('DespegarEmbeddedController.$evalAsync');
		$scope.init();
	});
});

