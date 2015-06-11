var app = angular.module('yp-detail', []);
app.controller('DetailController', ['$scope','$http',function($scope,$http) {
    $scope.rfp = {};
    var id = gup('id');
    console.log(id);
    $http.get('/rfp/'+id).success(function(data){
        console.log(data);
        $scope.rfp = data;
    });
}]);


function gup( name ){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
        return null;
    else
        return results[1];
}