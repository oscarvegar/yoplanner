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

		$scope.initGallery = function () {
			//Adaptar imagenes la formato de la directiva
			$scope.galleryPictures = [];
			$http.get("/recinto/findById/"+$scope.hotelid).success(function(hotel){
				hotel.pictures.forEach(function (picture) {
					$scope.galleryPictures.push({img: picture, thumb: picture});
				});
			})

		};

    $scope.agregarYRegresar = function() {
    	notify('Hotel agregado a Mi Selección');
      $rootScope.hotelesSeleccionados.push($scope.currentHotel);
			$scope.showAddButtonCurHot = $scope.existeEnSeleccion($scope.currentHotel);
      $localStorage.hotelesSeleccionados = JSON.stringify($rootScope.hotelesSeleccionados);
    };

		$scope.addSeleccion = function (id) {
			for (var i in $rootScope.hotelesSeleccionados) {
				if ($rootScope.hotelesSeleccionados[i].id == id) {
					notify('Este hotel ya está en Mi Selección');
					return;
				}
			}

			$http.get("/recinto/findById/"+id).then(function (hotel) {
				$rootScope.hotelesSeleccionados.push(hotel.data);
				$localStorage.hotelesSeleccionados = JSON.stringify($rootScope.hotelesSeleccionados);
				notify('Hotel ' + hotel.data.name + ' agregado a Mi Selección');
			});
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

		//Comentarios en detalle hotel
		// TODO: Implementar paginación
		$scope.loadComentarios = function () {
			$http.post('/comentariohotel/getComentarios/', {id: $scope.hotelid}).success(function(data) {
				console.log(data);
				$scope.comentarios = data.comentarios;
			}).error(function (err) {
				console.log(err);
			});
		};

		$scope.postComentario = function () {
			if(!$scope.postcomentario.text)
				return;

			$http.post('/comentariohotel/postComentario', {text: $scope.postcomentario.text, hotel: $scope.hotelid}).success(function(data) {
				$scope.postcomentario = null;
				console.log(data);
				notify('Comentario enviado correctamente.');
				$scope.comentarios.push(data.comentario);
			}).error(function (err) {
				console.log(err);
			});
		};

		$scope.fechaComentario = function (comentario) {
			var fecha = new Date(comentario.createdAt);
			return fecha;
		}

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
