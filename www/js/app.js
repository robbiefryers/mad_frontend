// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('maryhill', ['ionic', 'starter.controllers', 'ui.router'])

.constant('ApiEndpoint',{
  url: 'http://ec2-52-49-221-88.eu-west-1.compute.amazonaws.com:5555/'
})

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.views.transition('none');
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');

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
      StatusBar.backgroundColorByHexString("#074063");
    } else {
      StatusBar.styleLightContent();
    }
      StatusBar.styleDefault();
    }
  });
})


.service("allInfo", function AllInfo() {
  var AllInfo = this;

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
        templateUrl: "templates/activities.html",
        controller: 'ActivityCtrl'
      }
    }
    
  })

 .state('app.activityInfo', {
   url: "/activityInfo",
   views: {
     'menuContent': {
       templateUrl: "templates/activityInfo.html",
       controller: 'infoCtrl'
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
        templateUrl: "templates/contact.html",
        controller: 'HomeCtrl'

      }
    }
    
  })

 // If none of the above states are matched, use this as the fallback:
 $urlRouterProvider.otherwise('/app/activities');
})






