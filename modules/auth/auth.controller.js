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

    router.get('/profile', AuthMiddleware.readToken, async (req, res) => {
        try {
            const user = await authService.getUserById();
    
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor' });SSS
        }
    });

    router.patch('/profile',
        AuthMiddleware.updateUser,
        function (req, res) {
            res.status(200).json(req.response);
        });

    router.post('/login',
        AuthMiddleware.loginUser,
        function (req, res) {
            res.status(200).json(req.response);
        });

    module.exports = router;

})();




    
 
    

