var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var Category = new Schema({
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
});

// Compile model from schema
var Model = mongoose.model('category', Category);

export default Model
