const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const controller = require('../controllers/admin');
const authMiddleware = require('../middlewares/authUser');
const User = require('../models/User');

router.get('/', authMiddleware, controller.index);
router.get('/login', controller.getLogin);
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: true
    })
);

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},

    async (username, password, done) => {
        try {
            let userStored = await User.findOne({ email: username });
            if (!userStored) {
                return done(null, false, { message: "Invalid username !" })
            }
            const isMatch = await bcrypt.compare(password, userStored.password);
            if (isMatch) {
                return done(null, userStored);
            } else {
                return done(null, false, { message: "Invalid password !" })
            }
        } catch (err) {
            console.err(err.message);
        }
    }

));

passport.serializeUser((userStored, done) => {

    done(null, userStored.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let userStored = await User.findById(id);
        if (userStored) {
            done(null, userStored);
        }
    } catch (err) {
        console.log(err.message)
    }
});

module.exports = router