// Require
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var specieSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        unique: true
    },
    adultLength:  {
        type: Number,
        min: 1,
        max: 800,
        required: true
    },
    averageWeight:  {
        type: Number,
        min: 1,
        max:250,
        required: true
    },
    commonLocations: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Model
var Species = mongoose.model('Specie', specieSchema);

// Export
module.exports = Species;

