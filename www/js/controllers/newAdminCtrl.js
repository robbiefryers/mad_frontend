var module = angular.module('maryhillControllers');

module.controller('newAdminCtrl',function($scope, restService, $ionicPopup) {

  $scope.user = {
    username: "asd",
    password: "asdasd"
  };

  $scope.newAdmin = function() {
    $scope.userjson = angular.toJson($scope.user);
    restService.newAdmin($scope.userjson).then(function(msg){
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: 'Admin successfully created!'
      });
    }, function(msg){
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: 'Admin creation failed, check fields and ensure a user with that username doesnt already exist'
      });
    });
  }

});

