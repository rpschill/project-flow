var app = angular.module('app');

app.constant('FirebaseUrl', 'https://projectr-dev.firebaseio.com');

app.state('login', {
    url: '/login',
    controller: 'AuthCtrl as authCtrl',
    templateUrl: 'auth/login.html',
    resolve: {
        requireNoAuth: function($state, Auth) {
            return Auth.$requireAuth().then(function(auth) {
                $state.go('home');
            }, function(error) {
                return;
            });
        }
    }
});

app.state('register', {
    url: '/register',
    controller: 'AuthCtrl as authCtrl',
    templatUrl: 'auth/register.html',
    resolve: {
        requireNoAuth: function($state, Auth) {
            return Auth.$requireAuth().then(function(auth) {
                $state.go('home');
            }, function(error) {
                return;
            });
        }
    }
});

