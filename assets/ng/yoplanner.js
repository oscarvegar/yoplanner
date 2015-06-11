angular.module('yoPlannerApp', ['rfp-module','autocomplete'])
.controller('AutocompleteController',function($scope,$http,$timeout,$rootScope){
	$scope.searchString
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
		$http.get("/recinto/findByCiudadId/"+$scope.searchId).success(function (data){
			$rootScope.resHoteles = data.hotels;
			console.info($rootScope.resHoteles);

		})
	}
});
