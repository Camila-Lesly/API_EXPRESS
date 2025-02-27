'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
require('sinon-mongoose');

var mongoose = require('mongoose');

var UserModule = require('../../../modules/user/user.module')();
var UserModel = UserModule.UserModel;
var UserService = UserModule.UserService;

var Fixtures = require('../../fixtures/fixtures');
var UserFixture = Fixtures.UserFixture;
var ErrorFixture = Fixtures.ErrorFixture;

var UserModelMock;

describe('UserService', function () {

    beforeEach(function () {
        UserModelMock = sinon.mock(UserModel);
    });

    afterEach(function () {
        UserModelMock.restore();

        mongoose.models = {};
        mongoose.modelSchemas = {};

        return mongoose.connection.close();
    });

    describe('createUser', function () {
        var newUser, expectedCreatedUser, expectedError;

        it('should successfully create new user', function () {
            newUser = UserFixture.newUser;
            expectedCreatedUser = UserFixture.createdUser;

            UserModelMock.expects('create')
                .withArgs(newUser)
                .resolves(expectedCreatedUser);

            return UserService.createUser(newUser)
                .then(function (data) {
                    UserModelMock.verify();
                    expect(data).to.deep.equal(expectedCreatedUser);
                });
        });

        it('should throw error while creating user', function () {
            expectedError = ErrorFixture.unknownError;
            newUser = UserFixture.newUser;

            UserModelMock.expects('create')
                .withArgs(newUser)
                .rejects(expectedError);

            return UserService.createUser(newUser)
                .catch(function (error) {
                    UserModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });
        });

    });

    describe('fetchUsers', function () {
        var expectedUsers, expectedError;

        it('should successfully fetch all users', function () {
            expectedUsers = UserFixture.users;

            UserModelMock.expects('find')
                .withArgs({})
                .chain('exec')
                .resolves(expectedUsers);

            return UserService.fetchUsers()
                .then(function (data) {
                    UserModelMock.verify();
                    expect(data).to.deep.equal(expectedUsers);
                });

        });

        it('should throw error while fetching all users', function () {
            expectedError = ErrorFixture.unknownError;

            UserModelMock.expects('find')
                .withArgs({})
                .chain('exec')
                .rejects(expectedError);

            return UserService.fetchUsers()
                .catch(function (error) {
                    UserModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });
        });
    });

    describe('fetchUserById', function () {
        var expectedFetchedUser, userId, expectedError;

        it('should successfully fetch the user by id', function () {
            expectedFetchedUser = UserFixture.createdUser;
            userId = expectedFetchedUser._id;

            UserModelMock.expects('findById')
                .withArgs(userId)
                .chain('exec')
                .resolves(expectedFetchedUser);

            return UserService.fetchUserById(userId)
                .then(function (data) {
                    UserModelMock.verify();
                    expect(data).to.deep.equal(expectedFetchedUser);
                });
        });

        it('should throw error while fetching all users', function () {
            userId = UserFixture.createdUser._id;
            expectedError = ErrorFixture.unknownError;

            UserModelMock.expects('findById')
                .withArgs(userId)
                .chain('exec')
                .rejects(expectedError);

            return UserService.fetchUserById(userId)
                .catch(function (error) {
                    UserModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });
        });
    });

 describe('updateUser', function () {
        var existingUser, expectedModifiedUser, expectedError;

        it('should successfully update User', function () {
            expectedModifiedUser = UserFixture.modifiedUser;
            existingUser = UserFixture.createdUser;

            UserModelMock.expects('findByIdAndUpdate')
                .withArgs(existingUser._id, existingUser, {new: true})
                .chain('exec')
                .resolves(expectedModifiedUser);

            return UserService.updateUser(existingUser._id, existingUser)
                .then(function (data) {
                    UserModelMock.verify();
                    expect(data).to.deep.equal(expectedModifiedUser);
                });
        });

        it('should throw error while updating User', function () {
            expectedError = ErrorFixture.unknownError;
            existingUser = UserFixture.createdUser;

            UserModelMock.expects('findByIdAndUpdate')
                .withArgs(existingUser._id, existingUser, {new: true})
                .chain('exec')
                .rejects(expectedError);

            return UserService.updateUser(existingUser._id, existingUser)
                .catch(function (error) {
                    UserModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });
        });

    });

    describe('deleteUser', function () {
        var existingUser, expectedError;

        it('should successfully remove user', function () {
            existingUser = UserFixture.createdUser;

            UserModelMock.expects('findByIdAndRemove')
                .withArgs(existingUser._id)
                .chain('exec')
                .resolves(existingUser);

            return UserService.deleteUser(existingUser._id)
                .then(function (data) {
                    UserModelMock.verify();
                    expect(data).to.deep.equal(existingUser);
                });
        });

        it('should throw error while removing user', function () {
            expectedError = ErrorFixture.unknownError;
            existingUser = UserFixture.createdUser;

            UserModelMock.expects('findByIdAndRemove')
                .withArgs(existingUser._id)
                .chain('exec')
                .rejects(expectedError);

            return UserService.deleteUser(existingUser._id)
                .catch(function (error) {
                    UserModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });
        });

    });

});