var module = angular.module('maryhillControllers');

module.controller('SignUpCtrl', function ($scope, $rootScope, $state, $http, ApiEndpoint, AuthService) {

  $scope.newUser = {
    name: '',
    pass: ''
  };


      $scope.signUp = function() {
    AuthService.register($scope.newUser).then(function(msg) {
      $state.go('app.contact');
    }, function(errMsg) {
      console.log("failed");
    });
  };

  $scope.isDisplayed= false;

    $scope.$watch('isDisplayed', function($scope) {
      console.log('hello');
    
    });
   


});
