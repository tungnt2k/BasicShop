const { validationResult } = require('express-validator');

const Category = require('../../models/Category');

// @route GET api/cates
// @desc Get all categories
// @access Private

module.exports.getCategories = async (req, res) => {
    try {
        const cates = await Category.find();
        return res.json(cates);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
    }
}

// @route GET api/cates/:id
// @desc Get category
// @access Private

module.exports.getCategory = async (req, res) => {
    try {
        const cateId = req.params.id;
        const cate = await Category.findById(cateId);
        if (!cate) {
            return res.status(402).json({ message: "Category not found" });
        } else {
            return res.json(cate);
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
    }
}

// @route POST api/products
// @desc Create product
// @access Private



// @route PUT api/cates/:id
// @desc Update category
// @access Private

module.exports.putCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let { name, img, des } = req.body;
        let cateFields = {};
        if (name) cateFields.name = name;
        if (img) cateFields.img = img;
        if (des) cateFields.des = des;

        let cateStored = await Category.findById(req.params.id);
        if (!cateStored) {
            return res.status(404).json({ message: "Category not found" })
        } else {
            let cate = await Category.findByIdAndUpdate(
                req.params.id,
                { $set: cateFields },
                { new: true }
            );
            res.json(cate);
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Server Error ")
    }
}

// @route DELETE api/cates/:id
// @desc Delete category
// @access Private

module.exports.deleteCategory = async (req, res) => {
    try {
        let cateID = req.params.id;
        let cateStored = await Category.findById(cateID);
        if (!cateStored) {
            return res.status(404).json({ message: "Category not found" })
        } else {
            await Category.findByIdAndRemove(cateID);
            return res.json({ message: "Category deleted" })
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Server Error ")
    }
}