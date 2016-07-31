var module = angular.module('maryhillControllers');

module.controller('ActivityCtrl', function($scope, $state) {

  $scope.fontSize = 10;
  $scope.changeFontSize = function (fontSize) {
    angular.element(document.querySelectorAll('*')).css('font-size', fontSize + 'px');
  }

}

