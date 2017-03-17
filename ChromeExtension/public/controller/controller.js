function AppCtrl($scope,$http){
	console.log("hello world from controller");

$http.get('/contactList').success(function (response){

$scope.conctList=response;
});

}
