var module = angular.module('starter.controllers');

module.controller('ActivityCtrl', function($scope, $ionicLoading, $ionicModal) {


  $scope.items = [
    { id: "Karate", name: "Monday"},
    { id: "Scouts", name: "Thursday" },
    { id: "Badminton", name: "Tuesday"},
    { id: "Tai Chi", name: "Friday" },
    { id: "Aikido", name: "Sunday" },
    { id: "Beavers", name: "Saturday" },
    { id: "Cooking club", name: "Tuesday" },
    { id: "Craft fun", name: "Monday" }
  ];

    // Modal 1
    $ionicModal.fromTemplateUrl('templates/filterMainModal.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'scale-in'
    }).then(function(modal) {
      $scope.oModal1 = modal;
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

    /* Listen for broadcasted messages */

    $scope.$on('modal.shown', function(event, modal) {
      console.log('Modal ' + modal.id + ' is shown!');
    });

    $scope.$on('modal.hidden', function(event, modal) {
      console.log('Modal ' + modal.id + ' is hidden!');
    });
})