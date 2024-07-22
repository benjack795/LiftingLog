const mongoose = require('mongoose');

const liftSchema = new mongoose.Schema({
    extype: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    curdate: {
        type: Date,
        required: true,
        default: Date.now()
    }

})

module.exports = mongoose.model('Lift', liftSchema)