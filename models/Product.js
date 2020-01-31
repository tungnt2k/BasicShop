const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
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
    price: {
        type: Number,
        require: true
    },
    amout: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    },
    updateBy: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    cateId: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('product', ProductSchema)