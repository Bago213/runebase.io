var app = angular.module('myApp', []);
app.controller('myController',['$q', '$scope','$http',function($q,$scope,$http){
        $scope.$emit('LOAD');
        $data_1 = $http.get('https://explorer.runebase.io/runebase-insight-api/supply', {cache: false});
        $data_2 = $http.get('https://explorer.runebase.io/runebase-insight-api/supply', {'cache': false}); //Place holder for Price Request or other API get
        $q.all([$data_1, $data_2])
        .then(function(data){
            console.log(data[0]);
            console.log(data[1]); // Placeholder console log price request
            var blockNumber=data[0].data/100;
            var supply=data[0].data;
            data = [
            {
                title: "Minted Blocks",
                message: blockNumber
            },
            {
                title: "Circulating Supply",
                message: supply
            },
            {
                title: "Current Price",
                message: "0"
            }
            ];
            console.log(data);
            $scope.coinData = data;   
            $scope.$emit('UNLOAD');
        })
    }]).controller('MainCtrl',['$scope',function($scope){
            $scope.$on('LOAD',function(){$scope.loading=true});
            $scope.$on('UNLOAD',function(){$scope.loading=false});
        }])
  