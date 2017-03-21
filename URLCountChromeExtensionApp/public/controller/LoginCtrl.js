/**
 * Created by SaiRahem on 19/3/17.
 */


angular.module("UrlCounterApp").controller("LoginCtrl", function ($scope, $state, $http) {

    $scope.login = function () {
 
        $http({
            method : "POST",
            url : "/login",
            data: {
                "username":$scope.userName,
                "password":$scope.password
            }
         }).then(function mySucces(response) {
             $state.go("dashboard");
        }, function myError(response) {
             alert("User is not authenticated");
        });


    }
});