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
    var SECRET_KEY = require('../../config/config').SECRET_KEY;

    function validateRegisterData(req, res, next) {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'The password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'The email is not valid.' });
        }


        if (password.length > 20) {
            return res.status(400).json({
                message: 'The password must not exceed 20 characters.'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'The passwords do not match.'
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
            return res.status(400).json({ message: "Email and password are required" });
        }

        AuthService.loginUser(email, password)
            .then(success)
            .catch(error);

        function success(data) {
            req.response = data;
            next();
        }

        function error(err) {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }

    function guardLogin(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token no found' });
        }

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            req.userId = decoded.id;
            next();
        });
    }

})();
