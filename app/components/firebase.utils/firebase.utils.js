angular.module('firebase.utils', ['firebase', 'app.config'])
    .factory('fbutil', ['$window', 'FBURL', '$q', function($window, FBURL, $q) {
        "use strict";

        var utils = {
            handler: function(fn, context) {
                return util.defer(function(def) {
                    fn.call(context, function(err, result) {
                        if( err !== null ) { def.reject(err); }
                        else { def.resolve(result); }
                    });
                });
            },

            defer: function(fn, context) {
                var def = $q.defer();
                fn.call(context, def);
                return def.promise;
            },

            ref: firebaseRef
        };

        return utils;

        function pathRef(args) {
            for(var i = 0; i < args.length; i++) {
                if (angular.isArray(args[i])) {
                    args[i] = pathRef(args[i]);
                }
                else if ( typeof args[i] !== 'string' ) {
                    throw new Error('Argument ' +i+' to firebaseRef is not a string: '+args[i]);
                }
            }
            return args.join('/');
        }

        function firebaseRef(path) {
            var ref = new $window.Firebase(FBURL);
            var args = Array.prototype.slice.call(arguments);
            if( args.length ) {
                ref = ref.child(pathRef(args));
            }
            return ref;
        }
    }]);