// GET ALL PRODUCTS IN CART
// @access Private
const Sessions = require('../../models/sessions.model');
const Products = require('../../models/Product');

module.exports.getProducts = async (req, res) => {
    try {
        let sessionId = req.headers.cookie.split('=').splice(1).join('');
        let sessions = await Sessions.findOne({sessionId: sessionId});
        let products = [];
        if(sessions.cart){
            for (const key in sessions.cart) {
                let product = await Products.findById(key);
                product.amount = sessions.cart[key];
                products.push(product);
            }
        }

        return res.json(products);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
    }
};