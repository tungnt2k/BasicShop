
var passport = require('passport');

module.exports.index = (req, res) => {
    res.render('admin/index');
}

module.exports.getLogin = (req, res) => {
    res.render('admin/login');
}
