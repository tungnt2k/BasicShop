const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    googleId:{
        type: String
    }
})

module.exports = mongoose.model('user', UserSchema)