var module = angular.module('maryhillControllers');

module.controller('superModCtrl',function($scope, $state, allInfo, restService, AuthService, $ionicHistory){
  
  //call the rest service every time the view is entered
  //ensures the list will be updated after making a change in edit view as it redirects to here
  $scope.$on('$ionicView.enter', function() {
    restService.getAct().then(function successCallback(result) {  
      $scope.activities = result;
      }, function errorCallback(response) {
        console.log("failed");
      });
  });

  //Call the logout function from the AuthService Service
  //cache cleared due to iOS8.3 bug
  $scope.logout = function(){
    AuthService.logout();
    $ionicHistory.clearCache().then(function(){
      $state.go("app.activities")
      $scope.setStatus("out");
    });
  }

  //Use allInfo service to share information between this view and edit view
  $scope.editPage = function(item) {
    allInfo.edit = item.data;
    $state.go('app.super.edit');
  } 

});