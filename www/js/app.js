
angular.module('maryhill', ['ionic', 'maryhillControllers', 'ui.router'])

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
       templateUrl: "templates/login.html",
       controller: 'LoginCtrl'

     }
   }
 })
  .state('app.contact', {
    url: "/contact",
    views: {
      'menuContent': {
        templateUrl: "templates/contact.html",

      }
    }
  })

  .state('app.signUp', {
    url: "/signup",
    views: {
      'menuContent': {
        templateUrl: "templates/register.html",
        controller: 'SignUpCtrl'

      }
    }
  })

  .state('inside', {
    url: "/mymaduser",
    views: {
      'menuContent': {
        templateUrl: "templates/myMadUser.html",
        controller: 'userCtrl'

      }
    }
  })
 
 // If none of the above states are matched, use this as the fallback:
 $urlRouterProvider.otherwise('/app/activities');
})






