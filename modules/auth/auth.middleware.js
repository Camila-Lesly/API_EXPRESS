;(function () {
  'use strict'

  module.exports = {
    updateUser: updateUser,
    deleteProfile: deleteProfile,
    verifyToken: verifyToken
  }

  var AuthService = require('./auth.module')().AuthService
  var jwt = require('jsonwebtoken')
  const config = require('../../config/config')

  function updateUser(req, res, next) {
    AuthService.updateUser(req.params.userId, req.body).then(success).catch(error)

    function success(data) {
      req.response = data
      next()
    }

    function error(err) {
      next(err)
    }
  }

  function deleteProfile(req, res, next) {
    AuthService.deleteProfile(req.user.id).then(success).catch(error)

    function success(data) {
      req.response = data
      next()
    }

    function error(err) {
      err.status = err.status || 500
      next(err)
    }
  }

  function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (!bearerHeader) {
      const error = new Error('No token provided')
      error.status = 401
      return next(error)
    }

    const [bearer, token] = bearerHeader.split(' ')

    if (bearer !== 'Bearer' || !token) {
      const error = new Error('Invalid token format')
      error.status = 401
      return next(error)
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        const error = new Error('Invalid token')
        error.status = 401
        return next(error)
      }
      req.user = decoded
      next()
    })
  }
})()
