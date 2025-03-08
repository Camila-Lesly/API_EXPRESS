(function () {
    'use strict';

    var express = require('express');
    var bcrypt = require('bcryptjs');
    var router = express.Router();
    var AuthMiddleware = require('./auth.module')().AuthMiddleware;
    var AuthService = require('./auth.module')().AuthService;

    router.post('/register', AuthMiddleware.validateRegisterData, async function (req, res, next) {
        try {
            const user = await AuthService.registerUser(req.body);
            res.status(201).json({ message: 'Usuario registrado exitosamente', user });
        } catch (err) {
            next(err);
        }
    });

    router.get('/profile', 
        AuthMiddleware.guardLogin,
        AuthMiddleware.getUser,
        function (req, res) {
            res.status(200).json(req.user);
        });

    router.patch('/profile',
        AuthMiddleware.guardLogin,
        AuthMiddleware.updateUser,
        function (req, res) {
            res.status(200).json(req.response);
        });

    router.post('/login',
        AuthMiddleware.loginUser,
        function (req, res) {
            res.status(200).json(req.response);
        });
    
    router.delete('/profile',
        AuthMiddleware.guardLogin,
        AuthMiddleware.deleteProfile,
        function (req, res) {
            res.status(200).json(req.response);
        });

    module.exports = router;

})();
