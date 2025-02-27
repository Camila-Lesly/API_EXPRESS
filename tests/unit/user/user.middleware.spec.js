'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var httpMocks = require('node-mocks-http');
var bluebird = require('bluebird');
var Promise = bluebird.Promise;

var UserModule = require('../../../modules/user/user.module')();
var UserMiddleware = UserModule.UserMiddleware;
var UserService = UserModule.UserService;

var Fixtures = require('../../fixtures/fixtures');
var UserFixture = Fixtures.UserFixture;
var ErrorFixture = Fixtures.ErrorFixture;

var req, res, next;

describe('UserMiddleware', function () {

    beforeEach(function () {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = sinon.spy();
    });

    describe('addUser', function () {
        var createUser, createUserPromise, expectedCreatedUser, expectedError;

        beforeEach(function () {
            createUser = sinon.stub(UserService, 'createUser');
            req.body = UserFixture.newUser;
        });

        afterEach(function () {
            createUser.restore();
        });

        it('should successfully create new user', function () {
            expectedCreatedUser = UserFixture.createdUser;

            createUserPromise = Promise.resolve(expectedCreatedUser);
            createUser.withArgs(req.body).returns(createUserPromise);

            UserMiddleware.addUser(req, res, next);

            sinon.assert.callCount(createUser, 1);

            return createUserPromise.then(function () {
                expect(req.response).to.be.a('object');
                expect(req.response).to.deep.equal(expectedCreatedUser);
                sinon.assert.callCount(next, 1);
            });

        });

        it('should throw error while creating the new user', function () {
            expectedError = ErrorFixture.unknownError;

            createUserPromise = Promise.reject(expectedError);
            createUser.withArgs(req.body).returns(createUserPromise);

            UserMiddleware.addUser(req, res, next);

            sinon.assert.callCount(createUser, 1);

            return createUserPromise.catch(function (error) {
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });

        });

    });

    describe('getUsers', function () {
        var fetchUsers, fetchUsersPromise, expectedUsers, expectedError;

        beforeEach(function () {
            fetchUsers = sinon.stub(UserService, 'fetchUsers');
            req.body = {};
        });

        afterEach(function () {
            fetchUsers.restore();
        });

        it('should successfully get all users', function () {
            expectedUsers = UserFixture.users;

            fetchUsersPromise = Promise.resolve(expectedUsers);
            fetchUsers.returns(fetchUsersPromise);

            UserMiddleware.getUsers(req, res, next);

            sinon.assert.callCount(fetchUsers, 1);

            return fetchUsersPromise.then(function () {
                expect(req.response).to.be.a('array');
                expect(req.response.length).to.equal(expectedUsers.length);
                expect(req.response).to.deep.equal(expectedUsers);
                sinon.assert.callCount(next, 1);
            });

        });

        it('should throw error while getting all users', function () {
            expectedError = ErrorFixture.unknownError;

            fetchUsersPromise = Promise.reject(expectedError);
            fetchUsers.returns(fetchUsersPromise);

            UserMiddleware.getUsers(req, res, next);

            sinon.assert.callCount(fetchUsers, 1);

            return fetchUsersPromise.catch(function (error) {
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });

        });

    });

    describe('getUserById', function () {
        var fetchUserById, fetchUserByIdPromise, expectedUser, expectedError;

        beforeEach(function () {
            fetchUserById = sinon.stub(UserService, 'fetchUserById');
        });

        afterEach(function () {
            fetchUserById.restore();
        });

        it('should successfully fetch the user by id', function () {
            expectedUser = UserFixture.createdUser;

            fetchUserByIdPromise = Promise.resolve(expectedUser);
            fetchUserById.withArgs(req.params.UserId).returns(fetchUserByIdPromise);

            UserMiddleware.getUserById(req, res, next);

            sinon.assert.callCount(fetchUserById, 1);

            return fetchUserByIdPromise.then(function () {
                expect(req.response).to.be.a('object');
                expect(req.response).to.deep.equal(expectedUser);
                sinon.assert.callCount(next, 1);
            });

        });

        it('should throw error while getting user by id', function () {
            expectedError = ErrorFixture.unknownError;

            fetchUserByIdPromise = Promise.reject(expectedError);
            fetchUserById.withArgs(req.params.UserId).returns(fetchUserByIdPromise);

            UserMiddleware.getUserById(req, res, next);

            sinon.assert.callCount(fetchUserById, 1);

            return fetchUserByIdPromise.catch(function (error) {
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });
        });

    });
    
     describe('modifyUser', function () {
        var updateUser, updateUserPromise, expectedModifiedUser, expectedError;

        beforeEach(function () {
            updateUser = sinon.stub(UserService, 'updateUser');

            req.body = UserFixture.modifiedUser;
            req.params.userId = req.body._id;
        });

        afterEach(function () {
            updateUser.restore();
        });

        it('should successfully modify the user details', function () {
            expectedModifiedUser = UserFixture.modifiedUser;

            updateUserPromise = Promise.resolve(expectedModifiedUser);
            updateUser.withArgs(req.params.userId, req.body).returns(updateUserPromise);

            UserMiddleware.modifyUser(req, res, next);

            sinon.assert.callCount(updateUser, 1);

            return updateUserPromise.then(function () {
                expect(req.response).to.be.a('object');
                expect(req.response).to.deep.equal(expectedModifiedUser);
                sinon.assert.callCount(next, 1);
            });
        });

        it('should throw error while modifying user details', function () {
            expectedError = ErrorFixture.unknownError;

            updateUserPromise = Promise.reject(expectedError);
            updateUser.withArgs(req.params.userId, req.body).returns(updateUserPromise);

            UserMiddleware.modifyUser(req, res, next);

            sinon.assert.callCount(updateUser, 1);

            return updateUserPromise.catch(function (error) {
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });
        });

    });

    describe('removeUser', function () {
        var deleteUser, deleteUserPromise, expectedUser, expectedError;

        beforeEach(function () {
            deleteUser = sinon.stub(UserService, 'deleteUser');
        });

        afterEach(function () {
            deleteUser.restore();
        });

        it('should successfully remove the user', function () {
            expectedUser = UserFixture.createdUser;

            deleteUserPromise = Promise.resolve(expectedUser);
            deleteUser.withArgs(req.params.userId).returns(deleteUserPromise);

            UserMiddleware.removeUser(req, res, next);

            sinon.assert.callCount(deleteUser, 1);

            return deleteUserPromise.then(function () {
                expect(req.response).to.be.a('object');
                expect(req.response).to.deep.equal(expectedUser);
                sinon.assert.callCount(next, 1);
            });
        });

        it('should throw error while removing user', function () {
            expectedError = ErrorFixture.unknownError;

            deleteUserPromise = Promise.reject(expectedError);
            deleteUser.withArgs(req.params.userId).returns(deleteUserPromise);

            UserMiddleware.removeUser(req, res, next);

            sinon.assert.callCount(deleteUser, 1);

            return deleteUserPromise.catch(function (error) {
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });
        });

    });

});