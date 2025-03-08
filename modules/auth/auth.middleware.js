(function () {
    'use strict';

    module.exports = {
        updateUser: updateUser,
        readToken: readToken
    };
   
    var AuthService = require('./auth.module')().AuthService;

function readToken(req,res,next){
    
        const token = req.header('Authorization');

        
        if (!token) {
            return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
        }

        try {
            
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            
            
            req.user = decoded;
            next(); 
        } catch (error) {
            res.status(401).json({ message: 'Token inválido.' });
        }


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


