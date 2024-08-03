const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    photofile: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }

})

module.exports = mongoose.model('Photo', photoSchema)