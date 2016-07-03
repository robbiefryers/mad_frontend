// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])


.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
})

.controller('AppCtrl', function($scope, $ionicModal) {

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

.controller('ActivityCtrl', function($scope, $ionicLoading) {



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
})



.config(function($stateProvider, $urlRouterProvider) {
 $stateProvider
   .state('app', {
   url: "/app",
   abstract: true,
   templateUrl: "templates/menu.html",
   controller: 'AppCtrl'
 })
 .state('app.activities', {
   url: "/activities",
   views: {
     'menuContent': {
       templateUrl: "templates/activities.html"
     }
   }
 })

 .state('app.page1', {
   url: "/page1",
   views: {
     'menuContent': {
       templateUrl: "templates/page1.html"
     }
   }
 })

 .state('app.login', {
   url: "/login",
   views: {
     'menuContent': {
       templateUrl: "templates/login.html"
     }
   }
 })
 .state('app.contact', {
     url: "/contact",
     views: {
       'menuContent': {
         templateUrl: "templates/contact.html"
       }
     }
   })


 // If none of the above states are matched, use this as the fallback:
 $urlRouterProvider.otherwise('/app/activities');
})



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      if (ionic.Platform.isAndroid()) {
      StatusBar.backgroundColorByHexString("#0D5787");
    } else {
      StatusBar.styleLightContent();
    }
      StatusBar.styleDefault();
    }
  });
})
