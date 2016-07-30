var module = angular.module('maryhillControllers');

module.controller('infoCtrl',function($scope, $state, allInfo){

	$scope.sharedInfo = allInfo.details;

})