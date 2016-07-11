var module = angular.module('maryhillControllers');

module.controller('infoCtrl',function($scope, $state, allInfo){

	console.log(allInfo.details);
	$scope.sharedInfo = allInfo.details;

})