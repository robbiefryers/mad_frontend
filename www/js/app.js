angular.module('maryhill', ['ionic', 'maryhillControllers', 'ui.router', 'maryhillServices', 'maryhillFilters', 'maryhillConstants', 'ionic-native-transitions', 'ngCordova'])

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.views.transition('none');

})

.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}])

/*called on start up*/
.run(function($ionicPlatform, settingsService) {
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

.config(function($stateProvider, $urlRouterProvider, USER_ROLES, settingsServiceProvider) {
//default state for the app, load in the home template which contains the sidebar and header
$stateProvider
  .state('intro', {
    url: "/intro",
    templateUrl: "templates/intro.html",
    controller: 'introCtrl'
    
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/home.html",
    
  })

  .state('app.activities', {
    url: "/activities",
    views: {
      'menuContent': {
        templateUrl: "templates/activities/activities.html",
        controller: 'ActivityCtrl'
      }
    }
    
  })

 .state('app.activityInfo', {
   url: "/activityInfo",
   views: {
     'menuContent': {
       templateUrl: "templates/activities/activityInfo.html",
       controller: 'infoCtrl'
     }
   }
 })

  .state('app.support', {
   url: "/support",
   views: {
     'menuContent': {
       templateUrl: "templates/support.html"
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

  .state('app.super', {
    url: "/super",
    abstract: true,
    views: {
      'menuContent': {
        templateUrl: "templates/super/super.html"
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.super]
    }
  })

  .state('app.super.modify', {
    url: '/modify',
    views: {
      'modify': {
        templateUrl: 'templates/super/modify.html',
        controller: 'superModCtrl'
      }
    }
  })

  .state('app.super.edit', {
    url: '/edit',
    views: {
     'modify': {
       templateUrl: "templates/super/editEvent.html",
       controller: 'superEditCtrl'
     }
    }
  })

  .state('app.super.newEvent', {
    url: '/newEvent',
    views: {
      'newEvent': {
        templateUrl: 'templates/super/newEvent.html',
        controller: 'newEventCtrl'
      }
    }
  })

  .state('app.super.newAdmin', {
    url: '/newAdmin',
    views: {
      'newAdmin': {
        templateUrl: 'templates/super/newAdmin.html',
        controller: 'newAdminCtrl'
      }
    }
  })

  .state('app.super.stats', {
    url: '/stats',
    views: {
      'stats': {
        templateUrl: 'templates/super/stats.html'
      }
    }
  })

  .state('app.admin', {
    url: "/admin",
    abstract: true,
    views: {
      'menuContent': {
        templateUrl: "templates/admin/admin.html"
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.super]
    },
    cache: false
  })

  .state('app.admin.modify', {
    url: '/modify',
    views: {
      'modifyAdmin': {
        templateUrl: 'templates/super/modify.html',
        controller: 'superModCtrl'
      }
    }
  })

  .state('app.admin.edit', {
    url: '/edit',
    views: {
     'modifyAdmin': {
       templateUrl: "templates/super/editEvent.html",
       controller: 'superEditCtrl'
     }
    }
  })

  .state('app.admin.newEvent', {
    url: '/newEvent',
    views: {
      'newEvent': {
        templateUrl: 'templates/super/newEvent.html',
        controller: 'newEventCtrl'
      }
    }
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'settingCtrl'
      }
    }
  })
 
 // Default state, if the tutorial option is still checked go to the intro page
 //problem with local storage in services only allows for string values to be stored
 //convert the string to boolean with json and then test the condition
    if (JSON.parse(settingsServiceProvider.$get().getTut())===true){
      $urlRouterProvider.otherwise('/intro');
      console.log(JSON.parse(settingsServiceProvider.$get().getTut()));
    }
    //otherwise go to the app
    else {
      $urlRouterProvider.otherwise('/app/activities');
      console.log(JSON.parse(settingsServiceProvider.$get().getTut()));
    }
})

/*
.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
 console.log("state change check");
    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized)

      }
    }
 
  });
})

*/
