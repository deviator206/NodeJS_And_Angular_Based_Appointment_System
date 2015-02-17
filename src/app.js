var app = angular.module("appointmentApp",[]);


app.controller('appLoginController', function($scope,$http){
	
	$scope.userName ="";
	$scope.userPassword ="";

	$scope.loginClicked = function(evt)
	{
		console.log(evt);
		console.log($scope.userName+" v/s "+$scope.userPassword )
		$http.get("login?name="+$scope.userName+"&passwd="+$scope.userPassword ).success(function(data){
		console.log(data)
		})
	};

	


})
