(function () {
    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var UserSchema = new Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            index: true,
        },
        password: {
            type: String,
            required: true
        },
        phoneNumber: Number,
        country: String
    });

    UserSchema.index({ email: 1, phoneNumber: 1 }, { unique: true });

    module.exports = mongoose.model('users', UserSchema);
})();