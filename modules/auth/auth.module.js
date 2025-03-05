(function () {
    'use strict';

    module.exports = init;

    function init() {
        return {
            AuthController: requirauth.e('./controller'),
            AuthMiddleware: require('./auth.middleware'),
            AuthService: require('./auth.service'),
            AuthModel: require('./auth.model')
        }
    }

})();
