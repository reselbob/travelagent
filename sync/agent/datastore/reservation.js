const mongoose = require('mongoose');
const reservation = mongoose.Schema({
    user:{type: Object, required: true},
    airline:{type: Object, required: true},
    auto: {type: Object, required: true},
    hotel: {type: Object, required: true},
    created: {
        type: Date,
        default: Date.now
    }
});

const Reservation = mongoose.model('Reservation', reservation);

module.exports = Reservation;