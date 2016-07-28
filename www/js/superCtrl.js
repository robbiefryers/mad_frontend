var module = angular.module('maryhillControllers');

module.controller('superCtrl',function($scope, $state, allInfo, $http, ApiEndpoint){

		$scope.dayTimes = [
		{day: "Monday", checked: false},
		{day: "Tuesday", checked: false},
		{day: "Wednesday", checked: false},
		{day: "Thursday", checked: false},
		{day: "Friday", checked: false},
		{day: "Saturday", checked: false},
		{day: "Sunday", checked: false},
	];
/*
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
      $state.go('app.super.superEdit');
      console.log($ionicHistory.viewHistory());

    } */

})