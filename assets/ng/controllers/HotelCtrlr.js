/*
 *
 */
'use strict';

var HotelModule = angular.module('yoPlannerApp.hotel', ['ngRoute', 'ui.router', 'ngAnimate', 'ngStorage', 'uiGmapgoogle-maps',
	'youtube-embed', 'cgNotify','twitter.timeline']);

HotelModule.constant('MONGOLAB_CONFIG', {
	baseUrl: '/databases/',
	dbName: 'ascrum'
});

//TODO: move those messages to a separate module
HotelModule.constant('CUSTOM.DESTINATIONS.REVIEW', {
	EMPTY:'Resultados Búsqueda',	
	ACA: 'Hoteles en Acapulco',
	CL1: 'Hoteles en Los Cabos',
	CUN: 'Hoteles en Cancun',
	CVJ: 'Hoteles en Cuernavaca',
	CZM: 'Hoteles en Cozumel',
	GDL: 'Hoteles en Guadalajara',
	HUX: 'Hoteles en Huatulco',
	JGDSM: 'Hoteles en Ixtapa',
	MEX: 'Hoteles en Ciudad de México',
	MTY: 'Hoteles en Monterrey',
	MZT: 'Hoteles en Mazatlán',
	NV1: 'Hoteles en Nuevo Vallarta',
	PA0: 'Hoteles en Pachuca',
	PBC: 'Hoteles en Puebla',
	PCM: 'Hoteles en Playa del Carmen',
	PVR: 'Hoteles en Puerto Vallarta',
	QRO: 'Hoteles en Queretaro',
	RM0: 'Hoteles en Riviera Maya',
	SD6: 'Hoteles en Cabo San Lucas',
	SJD: 'Hoteles en San José del Cabo',
	TLC: 'Hoteles en Toluca',
	ZLO: 'Hoteles en Manzanillo',
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


	// Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
	$urlRouterProvider
	// The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
	// Here we are just setting up some convenience urls.
		.when('/hoteles-en-acapulco', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'ACA'}, {location: false});
		})
		.when('/hoteles-en-los-cabos', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'CL1'}, {location: false});
		})
		.when('/hoteles-en-cancun', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'CUN'}, {location: false});
		})
		.when('/hoteles-en-cuernavaca', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'CVJ'}, {location: false});
		})
		.when('/hoteles-en-cozumel', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'CZM'}, {location: false});
		})
		.when('/hoteles-en-guadalajara', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'GDL'}, {location: false});
		})
		.when('/hoteles-en-huatulco', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'HUX'}, {location: false});
		})
		.when('/hoteles-en-ixtapa', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'JGDSM'}, {location: false});
		})
		.when('/hoteles-en-ciudad-de-mexico', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'MEX'}, {location: false});
		})
		.when('/hoteles-en-monterrey', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'MTY'}, {location: false});
		})
		.when('/hoteles-en-mazatlan', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'MZT'}, {location: false});
		})
		.when('/hoteles-en-nuevo-vallarta', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'NV1'}, {location: false});
		})
		.when('/hoteles-en-pachuca', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'PA0'}, {location: false});
		})
		.when('/hoteles-en-puebla', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'PBC'}, {location: false});
		})
		.when('/hoteles-en-playa-del-carmen', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'PCM'}, {location: false});
		})
		.when('/hoteles-en-puerto-vallarta', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'PVR'}, {location: false});
		})
		.when('/hoteles-en-queretaro', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'QRO'}, {location: false});
		})
		.when('/hoteles-en-riviera-maya', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'RM0'}, {location: false});
		})
		.when('/hoteles-en-cabo-san-lucas', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'SD6'}, {location: false});
		})
		.when('/hoteles-en-san-jose-del-cabo', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'SJD'}, {location: false});
		})
		.when('/hoteles-en-toluca', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'TLC'}, {location: false});
		})
		.when('/hoteles-en-manzanillo', function ($match, $state, $stateParams) {
			$state.go('hotel.review', {searchId: 'ZLO'}, {location: false});
		})

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
			resolve:{
				searchId: ['$stateParams', function($stateParams){
					return $stateParams.searchId;
				}]
			}
		})
		.state('hotel.review', {
			templateUrl: function ($stateParams){
				return 'ng/modules/reviews/' + $stateParams.searchId + '.review.tpl.html';
			}
		})
		.state('hotel_detail', {
			url: "/hotel/:searchId/detail/:hotelId",
			templateUrl: "ng/modules/hotel.detail.tpl.html"
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

HotelModule.controller('HotelController', function($scope, $http, $log, $timeout, $rootScope, $route, $routeParams,
	$state, $stateParams, $localStorage, uiGmapGoogleMapApi, uiGmapIsReady, notify, HotelSrvc, $sce) {
	
	console.log('HotelController');
	$scope.Math = window.Math;
	$scope.$storage = $localStorage;
    $rootScope.hotelesSeleccionados = $scope.$storage.hotelesSeleccionados!=null?JSON.parse($scope.$storage.hotelesSeleccionados):[];

	$scope.findAllHotelsByCity = function(searchId) {
		console.log("********************* $findAllHotelsByCity")
		searchId = searchId ? searchId : $stateParams.searchId;
		$http.get("/recinto/findByCiudadId/"+searchId).success(function (data){
			$rootScope.resHoteles = data;
			console.log("********************* $rootScope.resHoteles",$rootScope.resHoteles)
			if($rootScope.resHoteles) {
				for (var i = 0; i < $rootScope.resHoteles.length; i++) {
					$rootScope.resHoteles[i]['starRatingRange'] = new Array($rootScope.resHoteles[i].starRating);
				};
			}

            $scope.currentPage=1;
			$log.info($rootScope.resHoteles);
			$scope.hotels = $rootScope.resHoteles;
			$log.info($scope.hotels);
			$scope.moreHotels = new Array();

			$scope.bannerAd = HotelSrvc.getLocationBannerAd(searchId);
			$log.info($scope.bannerAd);

			// $state.go('hotel.list');
			// $location.url('/hotel/list/' + $scope.searchId);
		});
	};

	$scope.masResultados = function(){
		var searchId = $rootScope.searchId ? $rootScope.searchId : $stateParams.searchId;
		$scope.showMostrarMas = true;
		$http.get("/recinto/findByCiudadId/"+searchId+"?p="+$scope.currentPage).success(function (data){
			$scope.showMostrarMas = false;

			if(data) {
				for (var i = 0; i < data.length; i++) {
					data[i]['starRatingRange'] = new Array(data[i].starRating);
				};
			}

			$log.info(data);
			$scope.moreHotels = $scope.moreHotels.concat(data);
			if(data && data.length > 0) {
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
    };

    $scope.findSelectedHotelDetail = function() {
    	$scope.showloading = true;
    	$log.info('HotelController.findSelectedHotelDetail');

    	$scope.videoID = '9GdVZfIBvxQ';
    	$scope.videoURL = 'https://www.youtube.com/watch?v=JGmFl_gyaew';
    	$scope.playerVars = {
		    controls: 1,
		    autoplay: 0
		};

		var searchId = searchId ? searchId : ($rootScope.searchId ? $rootScope.searchId : $stateParams.searchId);
		var hotelId = hotelId ? hotelId : ($rootScope.hotelId ? $rootScope.hotelId : $stateParams.hotelId);

        $http.get("/recinto/findById/"+hotelId).success(function(data){
        	$log.info("SELECTED HOTEL SEARCH > > > >", data);
    		$log.info("SELECTED HOTEL ROOT_SCOPE > > > >", $rootScope.selectedHotel);
    		$log.info("SELECTED HOTEL ROOT_SCOPE stringify > > > >", JSON.stringify($rootScope.selectedHotel));

	    	if(data.youtube) {
	    		$scope.videoURL = data.youtube;	// Paradisus Playa del Carmen La Esmeralda
	    	}else if($rootScope.selectedHotel && $rootScope.selectedHotel.video){
	    		$scope.videoURL = $rootScope.selectedHotel.video	;
	    	}

        	if(data) {
	        	
	        		var hotelTMP = data;

	        		$scope.initilizeGooMap(hotelTMP);

	        		if($rootScope.selectedHotel) {
		        		hotelTMP["amenities"] = $rootScope.selectedHotel.amenities;
		        		hotelTMP["fotoPrincipal"] = $rootScope.selectedHotel.fotoPrincipal;
		        		//hotelTMP["reviewSummary"] = $rootScope.selectedHotel.reviewSummary;
		        		hotelTMP.video = $rootScope.selectedHotel.video;
	        		}

	        		$rootScope.selectedHotel = hotelTMP;
	        	
	        	
	        	if(data.salones && data.salones.length > 0) {
	        		$rootScope.selectedHotel.salones = data.salones[data.salones.length-1];
	        	}

	        	if(data.infoExtra && data.infoExtra.length > 0) {
	        		$rootScope.selectedHotel.infoExtra = data.infoExtra[data.infoExtra.length-1];
	        	}

	 			$scope.currentHotel = $rootScope.selectedHotel;
	 			$scope.starRange = new Array($scope.currentHotel.starRating);
	 			$scope.showAddButtonCurHot = $scope.existeEnSeleccion($scope.currentHotel);
	 			
	 			$timeout(function(){
		 			$("#single-carousel").owlCarousel({

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
	 				$scope.showloading = false;
		 		},1000);
	 			


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
	    	var TODAY = moment();
	    	$scope.facebook = $rootScope.selectedHotel.facebook?$rootScope.selectedHotel.facebook:"https://www.facebook.com/yoplanner";
	    	$scope.tweeter = $rootScope.selectedHotel.twitter?$rootScope.selectedHotel.twitter:"715213025549152256";
	    	$scope.gplus= $rootScope.selectedHotel.gplus?$rootScope.selectedHotel.gplus:'113624413123385492768';
	    	//INIT Rs


	    	$timeout(function(){
	    		 $('.gplusfeed').kycoGooglePlusFeed2({
	                id: $scope.gplus,
	                feedPosts: 5,
	            });	  
	            FB.XFBML.parse();
	              				 	
	    	},1000)	    	                   
        }).error(function(err){
        	$log.error(err);
        });
    };

    $scope.initilizeGooMap = function(hotelTMP) {
    	if(!hotelTMP.geoLocation)return;
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
			showMap: false,
			zoom: 17,
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
		$scope.showAddButtonCurHot = $scope.existeEnSeleccion($scope.currentHotel);
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
	 	$scope.showAddButtonCurHot = $scope.existeEnSeleccion($scope.currentHotel);
        $scope.$storage.hotelesSeleccionados = JSON.stringify($rootScope.hotelesSeleccionados);
    };

	$scope.init = function() {

		$log.info('HotelController.init');
		$scope.map = {showMap: false};
		$log.info("$routeParams.searchId",$routeParams.searchId);
		$log.info("$routeParams.hotelId",$routeParams.hotelId);
		// $scope.params.kuponId
		$log.info("$rootScope.searchId",$rootScope.searchId);
		$log.info("$stateParams.searchId",$stateParams.searchId);
		console.log("$stateParams.searchId",$stateParams.searchId);
		$log.info("$rootScope.$selectedCity",$rootScope.$selectedCity);
		$log.info("$stateParams.hotelId",$stateParams.hotelId);


		$scope.valDest = HotelSrvc.getDestReviewComp($stateParams.searchId);

		if($rootScope.$selectedCity) {

			console.log("$rootScope.$selectedCity",$rootScope.$selectedCity);

			console.log("$scope.$storage.arryCities *",$scope.$storage.arryCities)
			$scope.$storage = $localStorage.$default({
				selectedCity: $rootScope.$selectedCity
			});

			if(!$scope.$storage.arryCities) {
				$scope.$storage.arryCities = new Array();
			}

			var existInStoragedArry = false;
			for (var i = 0; i < $scope.$storage.arryCities.length; i++) {
				if($scope.$storage.arryCities[i].searchId == $stateParams.searchId) {
					$rootScope.$selectedCity = $scope.$storage.arryCities[i].selectedCity;
					existInStoragedArry = true;
					break;
				}
			};
			console.log("$scope.$storage.arryCities * * *",$scope.$storage.arryCities)

			if(!existInStoragedArry && $rootScope.$selectedCity.trim()) {
				$scope.$storage.arryCities.push({searchId: $stateParams.searchId, selectedCity: $rootScope.$selectedCity});
			}
		} else {

			console.log("$rootScope.$selectedCity",$rootScope.$selectedCity);
			//$rootScope.$selectedCity = $scope.$storage.selectedCity;
			console.log("$scope.$storage.arryCities",$scope.$storage.arryCities)
			$rootScope.$selectedCity = "";
			if($scope.$storage.arryCities) {
				for (var i = 0; i < $scope.$storage.arryCities.length; i++) {
					if($scope.$storage.arryCities[i].searchId == $stateParams.searchId) {
						$rootScope.$selectedCity = $scope.$storage.arryCities[i].selectedCity;
						break;
					}
				};
			}
		}

 		if($routeParams.hotelId || $rootScope.hotelId || $stateParams.hotelId) {
 			
 			$scope.findSelectedHotelDetail();
		} else if($routeParams.searchId || $rootScope.searchId || $stateParams.searchId) {
			console.log("DESTINO A 1 :::: ",$routeParams.searchId)
			console.log("DESTINO A 2 :::: ",$rootScope.searchId)
			console.log("DESTINO A BUSCAR :::: ",$stateParams.searchId)
			$scope.hotels=null
			$http.get("/recinto/findByCiudadId/"+$stateParams.searchId).success(function (data){
				$rootScope.resHoteles = data;

				if($rootScope.resHoteles) {
					for (var i = 0; i < $rootScope.resHoteles.length; i++) {
						$rootScope.resHoteles[i]['starRatingRange'] = new Array($rootScope.resHoteles[i].starRating);
					};
				}

	            $scope.currentPage=1;
				$log.info($rootScope.resHoteles);
				$scope.hotels = $rootScope.resHoteles;
				$log.info($scope.hotels);
				$scope.moreHotels = new Array();

				$scope.bannerAd = HotelSrvc.getLocationBannerAd($routeParams.searchId);
				$log.info($scope.bannerAd);
			})
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

    $scope.$back = function() { 
		// $window.history.back();
		var valDest = HotelSrvc.validateDestination($stateParams.searchId);
		if(valDest != null) {
			$state.go('hotel.review', {searchId: $stateParams.searchId});
		} else {
			$state.go('hotel', {searchId: $stateParams.searchId});
		}
	};

	$scope.$evalAsync(function() {
		$log.info('HotelController.$evalAsync');
		$scope.init();
	});
});
