// Require
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Schema
var knotSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    howtoUrl:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Model
var Knots = mongoose.model('Knot', knotSchema);

// Export
module.exports = Knots;