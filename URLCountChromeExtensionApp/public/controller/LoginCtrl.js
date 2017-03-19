/**
 * Created by SaiRahem on 19/3/17.
 */


angular.module("UrlCounterApp").controller("LoginCtrl", function ($scope, $state) {

    $scope.login = function () {
        $state.go('dashboard');
    }
});