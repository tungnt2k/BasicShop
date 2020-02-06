const Product = require('../models/Product')
const Sessions = require('../models/sessions.model');

module.exports.index = async (req, res, next) => {
    let products = await Product.find();
    let sessionId = req.headers.cookie.split('=').splice(1).join('');
    let count = 0;
    let sessions = await Sessions.findOne({sessionId: sessionId});
    if (sessions.cart) {
        for (const key in sessions.cart) {
            count = count + sessions.cart[key];
        }
    }

    res.render('products/index',{
        products: products,
        count: count
    })
};