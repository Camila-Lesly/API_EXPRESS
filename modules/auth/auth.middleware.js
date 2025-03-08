(function () {
    'use strict'

    module.exports = {
        validateRegisterData: validateRegisterData,
        updateUser: updateUser,
        getUser: getUser,
        loginUser: loginUser,
        deleteProfile: deleteProfile,
        guardLogin: guardLogin
    };

    var jwt = require('jsonwebtoken');
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

    async function updateUser(req, res, next) {
        try {
            const data = await AuthService.updateUser(req.userId, req.body)
            req.response = data
            next()
        } catch (err) {
            err.status = err.status || 500
            next(err)
        }
    }

    async function getUser(req, res, next) {
        try {
            const data = await AuthService.getUser(req.userId)
            req.user = data
            next()
        } catch (err) {
            err.status = err.status || 500
            next(err)
        }
    }

    async function deleteProfile(req, res, next) {
        try {
            const userId = req.userId
            const data = await AuthService.deleteProfile(userId)
            req.response = data
            next()
        } catch (err) {
            err.status = err.status || 500
            next(err)
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

    function guardLogin(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token inválido' });
            }

            req.userId = decoded.id;
            next();
        });
    }

})();
