(function () {
    'use strict';

    module.exports = {
        validateRegisterData: validateRegisterData,
        updateUser: updateUser,
        loginUser: loginUser
    };

    var AuthService = require('./auth.module')().AuthService;
    var validator = require('validator');

function validateRegisterData(req, res, next) {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.'
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'El correo electrónico no es válido.' });
        }


        if (password.length > 20) {
            return res.status(400).json({
                message: 'La contraseña no puede exceder los 20 caracteres.'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Las contraseñas no coinciden.'
            });
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
