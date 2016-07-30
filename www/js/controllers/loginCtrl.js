var module = angular.module('maryhillControllers');

module.controller('LoginCtrl', function ($scope, AuthService, $state, ApiEndpoint, $ionicPopup) {

	$scope.user = {
		username: "jimhamilton",
		password: "a"
	};

	$scope.logIn = function() {
		$scope.userjson = angular.toJson($scope.user);
		AuthService.login($scope.userjson).then(function(msg) {
			console.log(msg);
			//$state.go('app.super.modify');
		}, function(msg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
		});
	};

	$scope.logOut = function() {
		AuthService.logout();

	};
    $scope.Practice = function() {
	console.log(AuthService.isAuthenticated());

    };
});