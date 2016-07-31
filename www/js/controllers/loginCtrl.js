var module = angular.module('maryhillControllers');

module.controller('LoginCtrl', function ($scope, AuthService, $state, ApiEndpoint, $ionicPopup, $ionicHistory) {

	$scope.user = {
		username: "jimhamilton",
		password: "a"
	};

	$scope.logIn = function() {
		$scope.userjson = angular.toJson($scope.user);

		AuthService.login($scope.userjson).then(function(msg) {
			if (msg == 'super_role'){
				$state.go('app.super.modify');
				$scope.setStatus("super");
			}
			if (msg == 'admin_role'){
				$ionicHistory.nextViewOptions({
    				disableBack: true
  				});
				$state.go('app.admin');
				$scope.setStatus("admin");
			}
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
		$scope.setStatus("out");

	};
    $scope.Practice = function() {
	console.log(AuthService.isAuthenticated());

    };
});