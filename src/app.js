var app = angular.module("appointmentApp",["backendModule"]);


app.controller('appLoginController',['$scope', '$http',	'backend',function($scope,$http,backend){
	
	$scope.userName ="";
	$scope.userPassword ="";
	$scope.strLoginLabel = "Login";
	$scope.errorMsg = "";
	$scope.apiError=function()
	{
		console.log("apiError");
		$scope.errorMsg = "Error With Login";
		$scope.strLoginLabel = "Login";
	};

	$scope.apiWarning=function()
	{
		console.log("apiWarning");
		$scope.errorMsg = "Invalid Credentials!!";	
		$scope.strLoginLabel = "Login";
	};

	$scope.apiSuccess=function()
	{
		console.log("apiSuccess");
		$scope.strLoginLabel = "Login";

	};
	$scope.loginClicked = function(evt)
	{
			$scope.errorMsg = "";		
		if($scope.userName !== "" && $scope.userPassword !== "")
			{
			
				$scope.strLoginLabel = "Processing...";
				backend.sendRequest({
									"api":"LOGIN_API", 
									"param":{"name":$scope.userName, "passwd":$scope.userPassword}, 
									"success":$scope.apiSuccess,
									 "warning":$scope.apiWarning, 
									 "error":$scope.apiError})
				/*
				var promObj = $http.get("login?name="+$scope.userName+"&passwd="+$scope.userPassword );
				promObj.success(function(data){
			
												if(data !== undefined && data["userId"] !== undefined)
												{

													console.log(data)	
												}
												else
												{
													$scope.errorMsg = "Invalid Credentials!!";		
												}
												
												$scope.strLoginLabel = "Login";

											  });

				promObj.error(function(data){
												$scope.errorMsg = "Error With Login";
												$scope.strLoginLabel = "Login";
											  });*/

				
			}
	};

	


}])
