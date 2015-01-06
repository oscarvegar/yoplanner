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
		$http.get("/rfp/"+queryDict.rfp).success(function(data,status){
			console.log(data);
			$scope.rfp=data;

		$scope.rfp.sencillas = $scope.divideTipoHabitaciones(1,$scope.rfp.configuracionHabitaciones);
		$scope.rfp.dobles = $scope.divideTipoHabitaciones(2,$scope.rfp.configuracionHabitaciones);

		$scope.formatDate= function(date){
			return (moment(date).format("DD/MM"))
			
		}
		});
	}]);
   