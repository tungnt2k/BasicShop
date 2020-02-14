module.exports.login = (req, res) => {
    res.render('users/login');
};

module.exports.redirect = (req, res) => {
    res.redirect('/');
};