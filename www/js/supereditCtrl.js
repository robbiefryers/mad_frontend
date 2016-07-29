var module = angular.module('maryhillControllers');

module.controller('superEditCtrl',function($scope, $state, allInfo){
	$scope.sharedInfo = allInfo.edit;

	$scope.update = function() {
		$state.go('app.super.modify');
	}
})