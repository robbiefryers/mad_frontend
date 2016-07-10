var module = angular.module('starter.controllers');

module.controller('HomeCtrl',function($scope,$http,$ionicPopup,ApiEndpoint){


	$scope.getDetails = function(){
		alert("hello");

		$http({
		  method: 'GET',
		  url: ApiEndpoint.url + 'categories'
		}).then(function successCallback(response) {
			alert("Success wooo");
			$scope.myData = response.data;
			
		  }, function errorCallback(response) {
		  		alert("Fail");
		  });





}

})