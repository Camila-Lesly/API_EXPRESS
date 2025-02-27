'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var expect = chai.expect;
var request = chai.request;

var Mongoose = require('mongoose').Mongoose;
var Mockgoose = require('mockgoose-fix').Mockgoose;
var mongoose = new Mongoose;
var mockgoose = new Mockgoose(mongoose);

var app = require('../../app');

var Fixtures = require('../fixtures/fixtures');
var UserFixture = Fixtures.UserFixture;

var baseUri = '/users';

var testData = {
    existingUser: {}
};

describe('UserController', function () {

    describe("POST " + baseUri, function () {
        it('should add new user', function (done) {
            request(app)
                .post(baseUri)
                .send(UserFixture.newUser)
                .end(function (err, res) {

                    expect(res.status).to.equal(201);
                    expect(res.body).to.not.equal({});
                    expect(res.body._id).to.not.equal(undefined);
                    expect(res.body.firstName).to.equal(UserFixture.createdUser.firstName);

                    done();

                });
        });
    });

    describe("GET " + baseUri, function () {
        it('should get all users', function (done) {
            request(app)
                .get(baseUri)
                .end(function (err, res) {

                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.equal(undefined);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.not.equal(0);

                    testData.existingUser = res.body[0];

                    done();
                });
        });
    });

    describe('GET ' + baseUri + '/:userId', function () {

        it('should get a user by id', function (done) {
            request(app)
                .get(baseUri + '/' + testData.existingUser._id)
                .end(function (err, res) {

                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.equal(undefined);
                    expect(res.body).to.deep.equal(testData.existingUser);
                    expect(res.body.firstName).to.equal(testData.existingUser.firstName);

                    done();

                });
        });

    });
    
    describe('PUT ' + baseUri + '/:userId', function () {

        it('should modify existing user', function (done) {

            testData.modifiedUser._id = testData.existingUser._id;

            request(app)
                .put(baseUri + '/' + testData.modifiedUser._id)
                .send(testData.modifiedUser)
                .end(function (err, res) {

                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.equal(undefined);
                    expect(res.body.firstName).to.equal(testData.modifiedUser.firstName);
                    expect(res.body.address).to.equal(testData.modifiedUser.address);

                    done();
                });

        });

    });

    describe('DELETE ' + baseUri + '/:userId', function () {

        it('should remove an existing user', function (done) {
            request(app)
                .delete(baseUri + '/' + testData.existingUser._id)
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body.firstName).to.not.equal(undefined);
                    expect(res.body.firstName).to.equal(testData.existingUser.firstName);

                    done();
                });
        });

    });

});