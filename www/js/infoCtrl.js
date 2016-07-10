var module = angular.module('starter.controllers');

module.controller('infoCtrl',function($scope, $state, allInfo){

	console.log(allInfo.details);
	$scope.sharedInfo = allInfo.details;

})