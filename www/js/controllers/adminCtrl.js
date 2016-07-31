var module = angular.module('maryhillControllers');

module.controller('adminCtrl',function($scope, $state, allInfo, $http, ApiEndpoint, AuthService, $ionicHistory){

	 $http({
      method: 'GET',
      url: ApiEndpoint.url + 'activities'
    }).then(function successCallback(response) {
      $scope.activities = response.data;

      }, function errorCallback(response) {

      });
/*
    $scope.editPage = function(item) {
      allInfo.edit = item.data;
      $state.go('app.super.edit');

    } */


      $scope.logout = function(){
      AuthService.logout();

      $ionicHistory.clearCache().then(function(){
        $state.go("app.activities")
        $scope.setStatus("out");
      });

      }
  


})