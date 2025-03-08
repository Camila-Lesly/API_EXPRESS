(function () {
    'use strict';

    var express = require('express');
    var router = express.Router();

    var AuthMiddleware = require('./auth.module')().AuthMiddleware;

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

    module.exports = router;

})();




    
 
    

