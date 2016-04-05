'use strict';

angular.module('app', [
    'app.config',
    'app.login',
    'app.home',
    'app.account'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise( {
        redirectTo: '/home'
    });
}])

.run(['$rootScope', 'Auth', function($rootScope, Auth) {
    Auth.$onAuth(function(user) {
        $rootScope.loggedIn = !!user;
    });
}]);