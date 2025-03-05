(function () {
    'use strict';

    var express = require('express');
    var router = express.Router();

    var AuthMiddleware = require('./auth.module')().AuthMiddleware;

    router.patch('/profile',
        AuthMiddleware.updateUser,
        function (req, res) {
            res.status(200).json(req.response);
            
        });

    module.exports = router;

})();
