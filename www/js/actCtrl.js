var module = angular.module('starter.controllers');

module.controller('ActivityCtrl', function($scope, $http, $state, $ionicModal,ApiEndpoint, allInfo) {

  $scope.tester = "something else";

    // Modal 1
    $ionicModal.fromTemplateUrl('templates/filterMainModal.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'scale-in'

    }).then(function(modal) {
      $scope.oModal1 = modal;
      console.log($scope.tester);
    });

    

    // Modal 2
    $ionicModal.fromTemplateUrl('templates/dayModal.html', {
      id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'scale-in'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };



    $http({
      method: 'GET',
      url: ApiEndpoint.url + 'activities'
    }).then(function successCallback(response) {
      $scope.myData = response.data;
      }, function errorCallback(response) {

      });


    $scope.movePage = function(n) {
      allInfo.details = n.data;
      $state.go('app.activityInfo');

    };

    $scope.search = function(item) {
      if($scope.searchText == undefined) {
      }
      else {
        
      }
    }





})