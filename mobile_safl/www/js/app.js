// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('fishingLog', ['ionic', 'fishingLog.controllers','fishingLog.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html',
          controller: 'IndexController'
      }
    }
  })

  .state('app.newcatch', {
    url: '/newcatch',
    views: {
      'mainContent': {
        templateUrl: 'templates/newcatch.html',
        controller: 'CatchesController'
      }
    }
  })

  .state('app.catcheslookup', {
    url: '/catcheslookup',
    views: {
      'mainContent': {
        templateUrl: 'templates/catcheslookup.html',
        controller: 'CatchesController'
      }
    }
  })
  .state('app.specieslookup', {
    url: '/specieslookup',
    views: {
      'mainContent': {
        templateUrl: 'templates/specieslookup.html',
        controller: 'SpeciesController'
      }
    }
  })

  .state('app.knotslookup', {
    url: '/knotslookup',
    views: {
      'mainContent': {
        templateUrl: 'templates/knotslookup.html',
        controller: 'KnotsController'
      }
    }
  })

  .state('app.bragging', {
    url: '/bragging',
    views: {
      'mainContent': {
        templateUrl: 'templates/bragging.html',
        controller: 'BraggingController'
      }
    }
  })

  .state('app.aboutus', {
    url: '/aboutus',
    views: {
      'mainContent': {
        templateUrl: 'templates/aboutus.html',
        controller: 'AboutController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
