// Require
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var catchSchema = new Schema({
    specie: {
        type: String,
        required: true
    },
    lure: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    waterType: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        min: 1,
        max: 800,
        required: true
    },
    weight: {
        type: Number,
        min: 1,
        max:250,
        required: true
    },
    released:   {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

// Model
var Catches = mongoose.model('Catch', catchSchema);

// Export
module.exports = Catches;
