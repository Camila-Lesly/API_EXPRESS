(function () {
    'use strict';

    module.exports = {
        validateRegisterData: validateRegisterData,
        updateUser: updateUser
    };
   
    var AuthService = require('./auth.module')().AuthService;

function validateRegisterData(req, res, next) {
        const { firstName, email, password } = req.body;
        if (!firstName || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }
        next();
}

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
