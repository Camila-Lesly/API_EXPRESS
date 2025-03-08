(function () {
    'use strict'

    var bcrypt = require('bcrypt');
    var jwt = require('jsonwebtoken');
    var UserModel = require('./auth.module')().UserModel;
    var SECRET_KEY = require('../../config/config').SECRET_KEY;

    module.exports = {
        registerUser: registerUser,
        updateUser: updateUser,
        loginUser: loginUser,
        deleteProfile: deleteProfile,
        getUser: getUser
    };

    var bcrypt = require('bcryptjs');
    var UserModel = require('./auth.module')().UserModel;

    async function getUser(id) {
        try {
            return await User.findById(id).select('-password');
        } catch (error) {
            return null;
        }
    }

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
            .findByIdAndUpdate(userId, user, { new: true })
            .exec();
    }

    function loginUser(email, password) {
        return UserModel.findOne({ email }).exec()
            .then(user => {
                if (!user || !comparePassword(password, user.password)) {
                    throw new Error('Credenciales inválidas');
                }
                var token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
                return { token, user };
            });
    }

    function deleteProfile(userId) {
        return UserModel.findByIdAndDelete(userId)
            .exec()
            .then(deletedUser => {
                if (!deletedUser) {
                    const error = new Error('User not found')
                    error.status = 404
                    throw error
                }
                return {
                    message: 'Profile deleted successfully',
                    user: deletedUser
                }
            })
    }

    function hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }

    function comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }

})();
