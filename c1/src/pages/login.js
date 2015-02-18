
app.controller('appLoginController',['$scope', '$http','$location',	'backend','appDataService',function($scope,$http,$location,backend,appDataService){
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

	$scope.apiSuccess=function(data)
	{
		console.log("apiSuccess");
		appDataService.setUserDetails(data.userId,data.name,data.password);
		$scope.strLoginLabel = "Login";
		$location.path("/dashboard",false); 

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
				
			}
	};

}])
