var app = angular.module("appointmentApp",["ngRoute","backendModule"]);

app.controller('appWrapper', ['$route','$scope','$location' ,'$routeParams',function(r,s,l,rP){
	s.$route = r;
	s.location = l;
	s.$routeParams = rP;
}]);

app.config(function($routeProvider,$locationProvider){
	$routeProvider.when("/c1",{
		"templateUrl":"src/pages/login.html",
		"controller":"appLoginController"
	}).when("/dashboard",{
		"templateUrl":"src/pages/dashboard.html",
		"controller":"appDashboardController"
	}).otherwise({
		"templateUrl":"src/pages/default.html",
		"controller":"defaultController"
	});

	$locationProvider.html5Mode(true);
});