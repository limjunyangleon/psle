/**
 * @name: psleApp
 * @description: main module of the application
 */

angular.module('psleApp', [
    'firebase',
    'ui.router',
    'uiGmapgoogle-maps'
  ])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('login', {
                url: '/',
                controller: 'AuthCtrl as authCtrl',
                templateUrl: 'auth/login.html',
                resolve: {
                    requiredNoAuth: function ($state, Auth) {
                        return Auth.$requireAuth().then(function (auth) {
                            $state.go('profile');
                        }, function (error) {
                            return;
                        });
                    }
                }
            })
            .state('register', {
                url: '/register',
                controller: 'AuthCtrl as authCtrl',
                templateUrl: 'auth/register.html'
            })
            .state('home', {
                url: '/home',
                controller: 'HomeCtrl as homeCtrl',
                templateUrl: 'home/home.html',
                resolve: {
                    /*requireAuth: function($state, Auth){
                        return Auth.$requireAuth().catch(function() {
                            $state.go('login');
                        });
                    },*/
                    profile: function ($state, Auth, Profile) {
                        
                        return Auth.$requireAuth().then(function (auth) {
                            
                            return Profile.getProfile(auth.uid).$loaded();

                        }, function (error) {
                            $state.go('login');
                        });
                    }
                }
            })
            .state('profile', {
                url: '/profile',
                controller: 'ProfileCtrl as profileCtrl',
                templateUrl: 'users/profile.html',
                resolve: {
                    profile: function ($state, Auth, Profile) {
                        
                        return Auth.$requireAuth().then(function (auth) {
                            
                            return Profile.getProfile(auth.uid).$loaded().then(function (profile) {
                                
                                if (profile.profileCompleted) {
                                    $state.go('home');
                                } else {
                                    return profile;
                                }
                            });

                        }, function (error) {
                            $state.go('login');
                        });
                    }
                }
            })
            .state('search', {
                url: '/search',
                controller: 'SearchCtrl as searchCtrl',
                templateUrl: 'search/search.html',
                resolve: {
                    requireAuth: function($state, Auth){
                        return Auth.$requireAuth().catch(function() {
                            $state.go('login');
                        });
                    }
                }
            })
            .state('details', {
                url: '/details',
                controller: 'SearchCtrl as searchCtrl',
                templateUrl: 'search/details.html',
                resolve: {
                    requireAuth: function($state, Auth){
                        return Auth.$requireAuth().catch(function() {
                            $state.go('login');
                        });
                    }
                }
            });

        $urlRouterProvider.otherwise('/');

    })
    .config(function (uiGmapGoogleMapApiProvider) {

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCaXBV3pnvGrnkQKrpOXSXboD6iuyb0_Qk',
            v: '3.20',
            libraries: 'weather,geometry,visualization'
        });

    })
    .constant('FirebaseUrl', 'https://psleapp.firebaseio.com/');