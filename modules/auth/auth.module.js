;(function () {
  'use strict'

  module.exports = init

  function init() {
    return {
      AuthController: require('./auth.controller'),
      AuthMiddleware: require('./auth.middleware'),
      AuthService: require('./auth.service'),
      UserModel: require('./auth.model')
    }
  }
})()
