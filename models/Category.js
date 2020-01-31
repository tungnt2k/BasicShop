const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    des: {
        type: String
    },
    updateBy: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('category', CategorySchema)