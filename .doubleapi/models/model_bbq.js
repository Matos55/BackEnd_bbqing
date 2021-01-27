const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongo: Create a schema - this is like a blueprint.
const product_bqq_Schema = new Schema({
    id: {
        type: Number,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    // img: {
    //     contentType: String,
    //     data: Buffer,
    //     required: false,
    // },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

// Mongo: model collection that will be stored on mongoDB ----> this model ((with pre built logic functions)) will be related with the products_bqq's Schema.
const Model_bbq = mongoose.model('model_bbq', product_bqq_Schema);

// exports
module.exports = Model_bbq;