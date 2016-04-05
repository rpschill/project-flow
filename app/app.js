var app = angular.module('app', ['firebase', 'angular-md5', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('home', {
            url: '/',
            templateUrl: 'app/home/home.html',
            resolve: {
                requireNoAuth: function($state, Auth) {
                    return Auth.$requireAuth().then(function(auth) {
                        $state.go('profile');
                    }, function(error) {
                        return;
                    });
                }
            }
        })

        .state('login', {
            url: '/login',
            controller: 'AuthCtrl as authCtrl',
            templateUrl: 'app/auth/login.html',
            resolve: {
                requireNoAuth: function($state, Auth) {
                    return Auth.$requireAuth().then(function(auth) {
                        $state.go('home');
                    }, function(error) {
                        return;
                    });
                }
            }
        })

        .state('register', {
            url: '/register',
            controller: 'AuthCtrl as authCtrl',
            templatUrl: 'app/auth/register.html',
            resolve: {
                requireNoAuth: function($state, Auth) {
                    return Auth.$requireAuth().then(function(auth) {
                        $state.go('home');
                    }, function(error) {
                        return;
                    });
                }
            }
        })

        .state('profile', {
            url: '/profile',
            controller: 'ProfileCtrl as profileCtrl',
            templateUrl: 'app/users/profile.html',
            resolve: {
                auth: function($state, Users, Auth) {
                    return Auth.$requireAuth().then(function(auth) {
                        $state.go('home');
                    });
                },
                profile: function(Users, Auth) {
                    return Auth.$requireAuth().then(function(auth) {
                        return Users.getProfile(auth.uid).$loaded();
                    });
                }
            }
        });

    $urlRouterProvider.otherwise('/');
});

app.constant('FirebaseUrl', 'https://projectr-dev.firebaseio.com');

