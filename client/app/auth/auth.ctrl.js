app.controller('AuthCtrl', ['Auth', '$state', function(Auth, $state) {
    var authCtrl = this;

    authCtrl.user = {
        email: '',
        password: ''
    };
}]);