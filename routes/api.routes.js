const express = require('express');
const router = express.Router();

const apiProduct = require('../controllers/api/product')

router.get("/products", apiProduct.getProducts);

router.get("/products/:id", apiProduct.getProduct);

router.put("/products/:id", apiProduct.putProduct);

router.delete("/products/:id", apiProduct.deleteProduct);

module.exports = router;