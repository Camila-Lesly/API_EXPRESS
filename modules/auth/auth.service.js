const { readToken } = require('./auth.middleware');

(function () {
    'use strict';

    module.exports = {
        updateUser: updateUser,
        getUserById: getUserById
    };

    var UserModel = require('./auth.module')().UserModel;


    async function getUserById (id){
        try {
            return await User.findById(id).select('-password');
        } catch (error) {
            return null;
        }
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
