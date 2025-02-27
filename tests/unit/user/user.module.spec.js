var chai = require('chai');
var expect = chai.expect;

var UserModule = require('../../../modules/user/user.module');

describe('UserModule', function () {

    describe('user.module file', function () {
        it('should confirm UserModule function exist', function () {
            expect(UserModule).to.be.a('function');
        });

        it('should confirm UserModule function returns an object', function () {
            expect(UserModule()).to.be.a('object');
        });

        it('should confirm UserController function exist', function () {
            expect(UserModule().UserController).to.be.a('function');
        });

        it('should confirm UserMiddleware object exist', function () {
            expect(UserModule().UserMiddleware).to.be.a('object');
        });

        it('should confirm UserService object exist', function () {
            expect(UserModule().UserService).to.be.a('object');
        });

        it('should confirm UserModel function exist', function () {
            expect(UserModule().UserModel).to.be.a('function');
        });

    });

});