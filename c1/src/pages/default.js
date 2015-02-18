//appDashboardController

app.controller('defaultController',['$scope','$location',function(sp,$location){
		sp.strErrorMessage = "Wrong Page Attached!! "+ $location.path();
}])