(function () {
    'use strict';

    var express = require('express');
    var router = express.Router();

    var UserMiddleware = require('./user.module')().UserMiddleware;

    router.post('/',
        UserMiddleware.addUser,
        function (req, res) {
            res.status(201).json(req.response);
            
        });

    router.get('/',
        UserMiddleware.getUsers,
        function (req, res) {
            res.status(200).json(req.response);
        });

    router.get('/:userId',
        UserMiddleware.getUserById,
        function (req, res) {
            res.status(200).json(req.response);
        });

router.put('/:UserId',
        UserMiddleware.modifyUser,
        function (req, res) {
            res.status(200).json(req.response);
        });


    router.delete('/:UserId',
        UserMiddleware.removeUser,
        function (req, res) {
            res.status(200).json(req.response);
        });

    module.exports = router;

})();
