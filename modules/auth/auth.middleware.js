(function () {
    'use strict';

    module.exports = {
        updateUser: updateUser,
        loginUser: loginUser
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

    function loginUser(req, res, next) {
        var { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }

        AuthService.loginUser(email, password)
            .then(success)
            .catch(error);

        function success(data) {
            req.response = data;
            next();
        }

        function error(err) {
            res.status(401).json({ message: "Credenciales inválidas" });
        }
    }

})();

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }
    next();
};

module.exports = { validateLogin };
