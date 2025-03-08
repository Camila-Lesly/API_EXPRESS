;(function () {
  'use strict'

  module.exports = {
    updateUser: updateUser,
    deleteProfile: deleteProfile
  }

  const AuthService = require('./auth.module')().AuthService

  async function updateUser(req, res, next) {
    try {
      const data = await AuthService.updateUser(req.params.userId, req.body)
      req.response = data
      next()
    } catch (err) {
      err.status = err.status || 500
      next(err)
    }
  }

  async function deleteProfile(req, res, next) {
    try {
      // For now, get userId directly from params instead of JWT token
      const userId = req.params.userId
      const data = await AuthService.deleteProfile(userId)
      req.response = data
      next()
    } catch (err) {
      err.status = err.status || 500
      next(err)
    }
  }
})()
