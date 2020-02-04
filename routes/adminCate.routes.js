const express = require('express');
const router = express.Router();

const adminCategoryController = require('../controllers/adminCate.controller');

router.get('/list', adminCategoryController.getList);

router.get('/create', adminCategoryController.getCreate);

router.post('/create', adminCategoryController.postCreate);

module.exports = router