const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongo: Create a schema - this is like a blueprint.
const meeting_Schema = new Schema({
    id: {
        type: Number,
        required: [true, 'User ID number required'],
        trim: true,
        // unique: true,
        min: 1
    },
    name: {
        type: String,
        required: [true, 'User name required'],
        trim: true,
        max:200
    },
    contact: {
        type: Number,
        required: [true, 'Contact number required'],
        trim: true,
        // unique: true,
        min: 8
    },
    date_bookat: {
        type: Date,
        default: Date.now,
        required: true
    },
    meet_start: {
        type: Date,
        required: [true, 'Meeting Date_start required'],
        unique: true
    },
    meet_end: {
        type: Date,
        required: [true, 'Meeting Date_end  required'],
        unique: true
    }
});

// Mongo: model collection that will be stored on mongoDB ----> this model ((with pre built logic functions)) will be related with the meeting's Schema.
const Model_meet = mongoose.model('model_meet', meeting_Schema);

// exports
module.exports = Model_meet;