const mongoose = require('mongoose');

//Photo Schema: Filename and Date (the actual photos are stored in the public folder in the client) (mongo)
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

});

module.exports = mongoose.model('Photo', photoSchema);