const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    sessionId: {
        type: String,
        require: true,
    },
    cart: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('sessions', SessionSchema);