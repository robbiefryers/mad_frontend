var module = angular.module('maryhillControllers');

module.controller('LoginCtrl', function ($scope, AuthService, $state, ApiEndpoint) {

	$scope.user = {
		username: "jimhamilton",
		password: "a"
	};

	$scope.logIn = function() {
		$scope.userjson = angular.toJson($scope.user);
		AuthService.login($scope.userjson).then(function(msg) {
			$state.go('app.super');
		}, function(errMsg) {
			console.log("failed");
		});
	};

	$scope.logOut = function() {
		AuthService.logout();

	};

});