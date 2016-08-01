var module = angular.module('maryhillControllers');

module.controller('settingCtrl', function($scope, $state, settingsService) {

	console.log(settingsService.getFont());

	$scope.fontSize = settingsService.getFont();

  $scope.changeFontSize = function (size) {
    
    settingsService.setFont(size);
  };

});

