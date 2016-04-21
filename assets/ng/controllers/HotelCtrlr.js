/*
 *
 */
'use strict';

var HotelModule = angular.module('yoPlannerApp.hotel', ['ngAnimate', 'ngStorage', 'uiGmapgoogle-maps','cgNotify']);


HotelModule.config(function(uiGmapGoogleMapApiProvider) {

	
	
});

HotelModule.controller('HotelController', function($scope, $http, $log, $timeout, $rootScope,$localStorage,notify){ 
	$scope.searchId;
	$scope.masResultados = function(){
		console.debug("masResultados",$scope.searchId)
		var searchId = $scope.searchId;
		$http.get("/recinto/findByCiudadId/"+searchId+"?p="+$scope.currentPage).success(function (data){
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

    


    $scope.agregarYRegresar = function() {
    	$log.info('Hotel agregado a Mi Selección');
    	notify('Hotel agregado a Mi Selección');

        $rootScope.hotelesSeleccionados.push($scope.currentHotel);
		$scope.showAddButtonCurHot = $scope.existeEnSeleccion($scope.currentHotel);
        $localStorage.hotelesSeleccionados = JSON.stringify($rootScope.hotelesSeleccionados);
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
        $localStorage.hotelesSeleccionados = JSON.stringify($rootScope.hotelesSeleccionados);
    };

	$scope.init = function() {
		$scope.moreHotels = [];
 		$scope.showMostrarMas = true;
 		$scope.currentPage = 1;
		$rootScope.hotelesSeleccionados = $localStorage.hotelesSeleccionados!=null?JSON.parse($localStorage.hotelesSeleccionados):[];
		$scope.hotelid;
		$http.get("/recinto/findById/"+$scope.hotelid).success(function(hotel){
			if(hotel){
				$scope.currentHotel = hotel;
				$scope.showAddButtonCurHot = $scope.existeEnSeleccion($scope.currentHotel);
			}
		})

	};

   
	$scope.$evalAsync(function() {
		$log.info('HotelController.$evalAsync');
		$scope.init();
	});
});
