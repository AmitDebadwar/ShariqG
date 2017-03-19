/**
 * Created by SaiRahem on 19/3/17.
 */

angular.module('UrlCounterApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.
    state("login", {
        url: "/login",
        templateUrl: chrome.extension.getURL('/public/views/login.html'),
        controller: "LoginCtrl"
    }).
    state("dashboard", {
        url: "/dashboard",
        templateUrl: chrome.extension.getURL('/public/views/dashboard.html'),
        controller: "DashboardCtrl"
    });

    $urlRouterProvider.otherwise("/login");

}]);
