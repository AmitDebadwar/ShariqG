/**
 * Created by SaiRahem on 19/3/17.
 */

angular.module('UrlCounterApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    var mode="browser";
    //var mode="extension";


    var getUrl=function(){
        if(mode==="browser"){
            return {
                "loginUrl":"views/login.html",
                "dashboardUrl":"views/dashboard.html",
                "signupUrl":"views/signup.html"
            }
        }
        else if (mode==="extension"){
                return {
                    "loginUrl":chrome.extension.getURL('/public/views/login.html') ,
                    "dashboardUrl":chrome.extension.getURL('/public/views/dashboard.html'),
                    "signupUrl":chrome.extension.getURL('/public/views/signup.html')
                }
            }
    }




    $stateProvider.
    state("login", {
        url: "/login",
        templateUrl:getUrl().loginUrl,
        controller: "LoginCtrl"
    }).
    state("dashboard", {
        url: "/dashboard",
        templateUrl:getUrl().dashboardUrl,
        controller: "DashboardCtrl"
    }).
    state("signup", {
        url: "/signup",
        templateUrl:getUrl().signupUrl,
        controller: "SignupCtrl"
    });

    $urlRouterProvider.otherwise("/login");

}]);
