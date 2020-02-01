const Product = require('../models/Product')

module.exports.create = (req, res, next) => {
   res.render('products/create')
};

module.exports.createPost = (req, res, next) => {
   var file = req.file.path.split('/').splice(1).join('/');
   var data = {
      name: req.body.name,
      des: req.body.des,
      img: file,
      price: req.body.price,
      amount: req.body.amount
   };

   var newProduct = new Product(data);

   newProduct.save();
   
   res.redirect('/product');
}