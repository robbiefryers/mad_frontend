var module = angular.module('maryhillControllers');

module.controller('superCtrl',function($scope, $state, allInfo, $http, ApiEndpoint){



	 $http({
      method: 'GET',
      url: ApiEndpoint.url + 'activities'
    }).then(function successCallback(response) {
      $scope.activities = response.data;
      console.log($scope.activities);
      }, function errorCallback(response) {
      	$scope.showAlert();
      });

    $scope.editPage = function(item) {
      allInfo.edit = item.data;
      $state.go('app.super.edit');

    } 

    console.log("modify stae entered");

    $scope.update = function() {
      $state.go('app.super');

    }
  


})