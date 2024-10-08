const mongoose = require('mongoose');

//Lift Schema: exercise type, weight, number of sets, number of reps, date (mongo)
const liftSchema = new mongoose.Schema({
    extype: {
        type: Number, //1=squat, 2=bench, 3=deadlift
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
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }

});

module.exports = mongoose.model('Lift', liftSchema);