var module = angular.module('maryhillControllers');

module.controller('settingCtrl', function($scope, $state, settingsService) {

 $scope.changeTutorial = function () {
 
    settingsService.setTut();
    console.log(JSON.parse(settingsService.getTut()));
  };

   $scope.tutorialToggle = JSON.parse(settingsService.getTut());
    
});

