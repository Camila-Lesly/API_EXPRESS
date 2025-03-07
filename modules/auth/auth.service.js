(function () {
    'use strict';

    var bcrypt = require('bcrypt');
    var jwt = require('jsonwebtoken');
    var UserModel = require('./auth.module')().UserModel;
    var config = require('../config'); // Archivo donde tengas tu SECRET_KEY

    module.exports = {
        updateUser: updateUser,
        loginUser: loginUser
    };

    function updateUser(userId, user) {
        if (user.password) {
            user.password = hashPassword(user.password);
        }
        return UserModel
            .findByIdAndUpdate(userId, user, { new: true })
            .exec();
    }

    function loginUser(email, password) {
        return UserModel.findOne({ email }).exec()
            .then(user => {
                if (!user || !comparePassword(password, user.password)) {
                    throw new Error('Credenciales inválidas');
                }
                var token = jwt.sign({ id: user._id, email: user.email }, config.SECRET_KEY, { expiresIn: '1h' });
                return { token, user };
            });
    }

    function hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }

    function comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }

})();