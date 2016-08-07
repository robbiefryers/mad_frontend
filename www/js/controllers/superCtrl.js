var module = angular.module('maryhillControllers');

module.controller('superCtrl',function($scope, $state, allInfo, $http, ApiEndpoint, AuthService, $ionicHistory){
  
  $scope.logout = function(){
    AuthService.logout();
    $ionicHistory.clearCache().then(function(){
      $state.go("app.activities")
      $scope.setStatus("out");
    });
  }

  $scope.sharedInfo = allInfo.edit;

  $scope.update = function() {
    $state.go('app.super.modify');
  }

  $http({
    method: 'GET',
    url: ApiEndpoint.url + 'activities'
  }).then(function successCallback(response) {
    $scope.activities = response.data;
    }, function errorCallback(response) {
    	$scope.showAlert();
    });

    $scope.editPage = function(item) {
      allInfo.edit = item.data;
      $state.go('app.super.edit');

    } 

    //---------------------------- New Admin Ctrl ----------------------------//
    $scope.user = {
      username: "asd",
      password: "asdasd"
    };

    

    $scope.newAdmin = function() {
     var user = $scope.userjson = angular.toJson($scope.user);
     console.log(user);
   $http({
      method: 'POST',
      url: ApiEndpoint.url + 'new-admin/',
      data: user,
      headers: {'Content-Type': 'application/json'}
    }).then(function successCallback(response) {
      alert('good to go');
      }, function errorCallback(response) {
        alert('ficked it');
      });
    }


  


})