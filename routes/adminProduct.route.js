const express = require('express');
const router = express.Router();

const multer  = require('multer')

const upload = multer({ dest: './public/uploads/' })

const controller = require('../controllers/adminProduct.constroller');

router.get('/create', controller.create);
router.post('/create',  upload.single('image'), controller.createPost);


module.exports = router;