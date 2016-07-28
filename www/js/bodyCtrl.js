var module = angular.module('maryhillControllers');

module.controller('bodyCtrl',function($scope, $state, AuthService){

	$scope.In = AuthService.isAuthenticated();

	$scope.test = function(){
		console.log($scope.In);
	}
})