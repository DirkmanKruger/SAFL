'use strict';

angular.module('fishingLogApp', ['ui.router', 'ngResource', 'ngDialog'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                // route for the home page
                .state('app', {
                    url: '/',
                    views: {
                        'header': {
                            templateUrl: 'views/header.html',
                            controller: 'HeaderController'
                        },
                        'content': {
                            templateUrl: 'views/home.html',
                            controller: 'HomeController'
                        },
                        'footer': {
                            templateUrl: 'views/footer.html',
                            controller: 'HeaderController'
                        }
                    }
                })

                // route for the newcatch page
                .state('app.newcatch', {
                    url: 'catch',
                    views: {
                        'content@': {
                            templateUrl: 'views/newcatch.html',
                            controller: 'CatchesController'
                        }
                    }
                })

                // route for the catcheslookup page
                .state('app.catcheslookup', {
                    url: 'catcheslookup',
                    views: {
                        'content@': {
                            templateUrl: 'views/catcheslookup.html',
                            controller: 'CatchesController'
                        }
                    }
                })

                // route for the specieslookup page
                .state('app.specieslookup', {
                    url: 'species',
                    views: {
                        'content@': {
                            templateUrl: 'views/specieslookup.html',
                            controller: 'SpeciesController'
                        }
                    }
                })

                // route for the knotslookup page
                .state('app.knotslookup', {
                    url: 'knots',
                    views: {
                        'content@': {
                            templateUrl: 'views/knotslookup.html',
                            controller: 'KnotsController'
                        }
                    }
                })

                // route for the bragging page
                .state('app.bragging', {
                    url: 'bragging',
                    views: {
                        'content@': {
                            templateUrl: 'views/bragging.html',
                            controller: 'BraggingController'
                        }
                    }
                })

                // route for the aboutus page
                .state('app.aboutus', {
                    url: 'aboutus',
                    views: {
                        'content@': {
                            templateUrl: 'views/aboutus.html',
                            controller: 'AboutController'
                        }
                    }
                });

        $urlRouterProvider.otherwise('/');
    })
;
