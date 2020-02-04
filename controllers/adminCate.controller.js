const Category = require('../models/Category');

module.exports.getList = (req, res) => {
    res.render('admin/listCates');
}

module.exports.getCreate = (req, res) => {
    res.render('admin/createCate');
}

module.exports.postCreate = async (req, res) => {
    let newCate = new Category({
        name: req.body.name,
        des: req.body.des
    });

    await newCate.save();

    res.redirect('/admin/cates/list');
}