var module = angular.module('maryhillControllers');

module.controller('introCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

 $scope.data = "heloo";
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('app.activities');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

  $scope.size = 40;
})