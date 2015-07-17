var queryDict = {}
location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
angular.module('yoPlannerAppResume', [])
	.controller('ResumenController', ["$scope","$http",function($scope,$http) {
		$scope.divideTipoHabitaciones = function(tipo,arre){
	    	var res = [];
	    	for(i in arre){
	    		if(arre[i].tipoHabitacion==tipo)
	    			res.push(arre[i]);
	    	}
	    	return res;
	    }
		console.log(queryDict);
		console.log($scope.rfp);
		$http.get("/tipoEvento").success(function(data,status){
			$scope.tipoEventos = data;
			$http.get("/montaje").success(function(data,status){
				$scope.montajes = data;
				$http.get("/rfp/"+queryDict.rfp).success(function(data,status){
					$scope.rfp=data;
					$scope.rfp.sencillas = $scope.divideTipoHabitaciones(1,$scope.rfp.configuracionHabitaciones);
					$scope.rfp.dobles = $scope.divideTipoHabitaciones(2,$scope.rfp.configuracionHabitaciones);
					for(var i in $scope.rfp.salones){
						$scope.rfp.salones[i].tipoEvento = $scope.findDescripcionTipoEvento($scope.rfp.salones[i].tipoEvento);
						$scope.rfp.salones[i].tipoSalon = $scope.findDescripcionMontaje($scope.rfp.salones[i].tipoSalon);
					}
				});
			});
		});
		$scope.formatDate= function(date){
			return (moment(date).format("DD/MM"))
		}
		$scope.formatDateNormal= function(date){
			return (moment(date).format("DD/MM/YYYY"))
		}

		$scope.findDescripcionTipoEvento= function(tipoEvento){
			for(var i in $scope.tipoEventos){
				if($scope.tipoEventos[i].id==tipoEvento){
					return $scope.tipoEventos[i];
				}
			}
			
		}

		$scope.findDescripcionMontaje= function(montaje){
			for(var i in $scope.montajes){
				if($scope.montajes[i].id==montaje){
					return $scope.montajes[i];
				}
			}
			
		}
	}]);
   