const router = require('express').Router();
const passport = require('passport');

const userLoginController = require('../controllers/userLogin.controller');

router.get('/login', userLoginController.login);

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google',{
    failureRedirect: "/auth/google",
    successRedirect: "/"
}), userLoginController.redirect);

module.exports = router;