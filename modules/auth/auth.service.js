(function () {
    'use strict';

    module.exports = {
        registerUser: registerUser,
        updateUser: updateUser
    };

    var bcrypt = require('bcryptjs');
    var UserModel = require('./auth.module')().UserModel;

    async function registerUser(userData) {
        var existingUser = await UserModel.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('El email ya está en uso');
        }
        userData.password = hashPassword(userData.password); 
        var newUser = new UserModel(userData);
        return newUser.save();
    }

    function updateUser(userId, user) {
        if (user.password) {
            user.password = hashPassword(user.password);
        }
        return UserModel
            .findByIdAndUpdate(userId, user, {new: true})
            .exec();
    }
})();

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}
