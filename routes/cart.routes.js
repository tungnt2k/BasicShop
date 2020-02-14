const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/authUser.middleware');

router.get('/', cartController.index);

// router.get('/:productId', cartController.addProduct);

router.get('/buy', authMiddleware, cartController.buy);

module.exports = router;