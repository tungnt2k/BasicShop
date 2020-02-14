const express = require('express');
const router = express.Router();

const cartApiController = require('../controller/cart.controller')

router.get('/cart/products', cartApiController.getProducts);

module.exports = router;