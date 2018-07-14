var app = angular.module('tables', ["ngTable"]);
app.controller('MainCtrl', function($scope, NgTableParams, $http) {
    $scope.getData = function($query){
        $scope.result = $http.get($query).then(
            function($response){
                return $response.data;
            }, function($response){ return [];});
            return $scope.result;
    }

    $scope.getData("/api/commits/last").then(function(data) {
        console.log(data);
        $scope.tableParams = new NgTableParams({count: data.length}, {counts: [], dataset: data});        
    });

});
  