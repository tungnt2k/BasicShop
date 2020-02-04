
var passport = require('passport');

module.exports.index = (req, res) => {
    res.render('admin/index');
}

module.exports.getLogin = (req, res) => {
    res.render('admin/login');
}

module.exports.getLogout = (req, res) => {
    req.logout();
    res.redirect('/admin')
}