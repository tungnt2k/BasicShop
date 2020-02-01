const Product = require('../models/Product')

module.exports.index = async (req, res, next) => {
    let products = await Product.find();

    res.render('products/index',{
        products: products
    })
};