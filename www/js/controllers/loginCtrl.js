var module = angular.module('maryhillControllers');

module.controller('LoginCtrl', function ($scope, AuthService, $state, ApiEndpoint, $ionicPopup, $ionicHistory) {

	$scope.user = {
		username: "",
		password: ""
	};
	$scope.newPass = {
		passOne: "",
		passTwo: ""
	};

	$scope.logIn = function() {
		$scope.userjson = angular.toJson($scope.user);

		AuthService.login($scope.userjson).then(function(first) {
			
			if(AuthService.role() == 'super_role'){
				$state.go('app.super.modify');
				$scope.setStatus("super");
			}

			if(AuthService.role() == 'admin_role'){
				if(first==false){
					$ionicHistory.nextViewOptions({
  					disableBack: true
					});
					$state.go('app.admin.modify');
					$scope.setStatus("admin");
				}
				else {
					var myPopup = $ionicPopup.show({
						template: '<input placeholder="Enter a new password" type="password" ng-model="newPass.passOne"><input placeholder="Confirm new password" type="password" ng-model="newPass.passTwo">',
						title: 'Change Password!',
						subTitle: 'Hi there, we noticed this is the first time you\'re logging in. Please enter a new password below' ,
						scope: $scope,
						buttons: [
					  	{ 
					    	text: 'Cancel',
					    	type: 'button-assertive',
					  	},
					  	{
					    	text: '<b>Save</b>',
					    	type: 'button-positive',
					    	onTap: function() {
					     		return true;
					    	}
					  	},
					 	]
					});
					myPopup.then(function(res) {
						if(res==true){
							if ($scope.newPass.passOne === "" ){
								var alertPopup = $ionicPopup.alert({
       						title: 'Blank Fields',
        					template: 'Please don\'t enter an empty password!'
      					});
							}
							if($scope.newPass.passOne == $scope.newPass.passTwo){
								$scope.passJson = angular.toJson($scope.newPass);
								AuthService.updatePass($scope.passJson).then(function(res) {
									$ionicHistory.nextViewOptions({
				  					disableBack: true
									});
									$state.go('app.admin');
									$scope.setStatus("admin");

								}, function(res) {
									console.log('error');
								});
							}
							else {
								var alertPopup = $ionicPopup.alert({
       						title: 'Unmatching Passwords!',
        					template: 'The passwords entered don\'t match'
      					});
							}
						}
					});
				}
			}
		}, function(msg) {

    		var alertPopup = $ionicPopup.alert({
     			title: 'Login failed!',
      		template: 'Please check your credentials!'
    		});
		});
	};

});