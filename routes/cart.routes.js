const express = require('express');
const router = express.Router();

const controller = require('../controllers/cart.controller');

router.get('/', controller.index);

router.get('/:productId', controller.addProduct);

module.exports = router;