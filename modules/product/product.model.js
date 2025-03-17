(function () {
    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var ProductSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
        },
    });

    module.exports = mongoose.model('products', ProductSchema);
})();
