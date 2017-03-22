/**
 * Created by SaiRahem on 19/3/17.
 */


angular.module("UrlCounterApp").controller("LoginCtrl", function ($scope, $state, $http) {


    $scope.login=function(){
        $state.go("signup");
    }

    $scope.loginOri = function () {

        $http({
            method : "GET",
            url : "/public/controller/login.json",
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