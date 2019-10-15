const mongoose = require('mongoose');
const user = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    created: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', user);

module.exports = User;