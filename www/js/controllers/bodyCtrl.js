var module = angular.module('maryhillControllers');

module.controller('bodyCtrl',function($scope, $state, AuthService, AUTH_EVENTS, $ionicPopup){

  $scope.state = "out";

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resources.'
    });
  });
 
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('app.login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

   $scope.setStatus = function(s) {
    $scope.state = s;
  };

})
