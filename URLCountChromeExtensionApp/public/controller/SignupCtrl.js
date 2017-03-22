/**
 * Created by SaiRahem on 19/03/2017.
 */


angular.module("UrlCounterApp").controller("SignupCtrl", function($scope,$state, $http) {

    $scope.signup = function () {

        $http({
            method : "POST",
            url : "/signup",
            data: {
                "firstName":$scope.firstName,
                "lastName":$scope.lastName,
                "userEmail":$scope.userEmail,
                "mobileNumber":$scope.mobileNumber,
                "country":$scope.selectedCountry,
                "zipcode":$scope.zipcode
            }
        }).then(function mySucces(response) {
            alert('User signed up successfuly!');
            $state.go('login');
        }, function myError(response) {
            alert("Network issue!");
        });


    }

});