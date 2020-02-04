const Product = require('../models/Product')

module.exports.create = (req, res) => {
   res.render('admin/createProduct')
};

module.exports.createPost = async (req, res) => {
   var file = req.file.path.split('\\').slice(1).join('/');
   var data = {
      name: req.body.name,
      des: req.body.des,
      img: file,
      price: req.body.price,
      amount: req.body.amount
   };

   var newProduct = new Product(data);

   await newProduct.save();

   res.redirect('/admin/products/list');
}

module.exports.getList = (req, res) => {
   res.render('admin/listProducts');
}