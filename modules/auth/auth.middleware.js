(function () {
    'use strict';

    module.exports = {
        updateUser: updateUser
    };
   
    var AuthService = require('./auth.module')().AuthService;

function updateUser(req, res, next) {
        AuthService.updateUser(req.params.userId, req.body)
            .then(success)
            .catch(error);

        function success(data) {
            req.response = data;
            next();
        }

        function error(err) {
            next(err);
        }
    }

})();
