const express = require('express');
const router = express.Router();

const apiProduct = require('../controllers/api/product');
const apiCategory = require('../controllers/api/category');


// Product
router.get("/products", apiProduct.getProducts);

router.get("/products/:id", apiProduct.getProduct);

router.put("/products/:id", apiProduct.putProduct);

router.delete("/products/:id", apiProduct.deleteProduct);


// Category
router.get("/cates", apiCategory.getCategories);

router.get("/cates/:id", apiCategory.getCategory);

router.put("/cates/:id", apiCategory.putCategory);

router.delete("/cates/:id", apiCategory.deleteCategory);


module.exports = router;