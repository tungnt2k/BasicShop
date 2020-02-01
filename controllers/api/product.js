const { validationResult } = require('express-validator');

const Product = require('../../models/Product');

// @route GET api/products
// @desc Get all products
// @access Private

module.exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
    }
}

// @route GET api/products/:id
// @desc Get product
// @access Private

module.exports.getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(402).json({ message: "Product not found" });
        } else {
            return res.json(product);
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
    }
}

// @route POST api/products
// @desc Create product
// @access Private



// @route PUT api/products/:id
// @desc Update product
// @access Private

module.exports.putProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let { name, img, des, price, amount } = req.body;
        let productFields = {};
        if (name) productFields.name = name;
        if (img) productctFields.img = img;
        if (des) productFields.des = des;
        if (price) productFields.price = price;
        if (amount) productFields.amount = amount;

        let productStored = await Product.findById(req.params.id);
        if (!productStored) {
            return res.status(404).json({ message: "Product not found" })
        } else {
            let product = await Product.findByIdAndUpdate(
                req.params.id,
                { $set: productFields },
                { new: true }
            );
            res.json(product);
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Server Error ")
    }
}

// @route DELETE api/products/:id
// @desc Delete product
// @access Private

module.exports.deleteProduct = async (req, res) => {
    try {
        let productId = req.params.id;
        let productStored = await Product.findById(productId);
        if (!productStored) {
            return res.status(404).json({ message: "Product not found" })
        } else {
            await Product.findByIdAndRemove(productId);
            return res.json({ message: "Product deleted" })
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Server Error ")
    }
}