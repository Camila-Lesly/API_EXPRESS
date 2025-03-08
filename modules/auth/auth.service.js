;(function () {
  'use strict'

  module.exports = {
    updateUser: updateUser,
    deleteProfile: deleteProfile
  }

  var UserModel = require('./auth.module')().UserModel

  function updateUser(userId, user) {
    if (user.password) {
      user.password = hashPassword(user.password)
    }
    return UserModel.findByIdAndUpdate(userId, user, { new: true }).exec()
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
})()

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}
