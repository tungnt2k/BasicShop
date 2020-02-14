const passport = require('passport');
const GoogleSrtategy = require('passport-google-oauth20').Strategy;

const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    await User.findById(id).then((userStore) => {
        if (!userStore) {
            done(null, false);
            return;
        }

        done(null, userStore);
    });
});

passport.use( new GoogleSrtategy (
    {
        clientID: keys.google.clientId,
        clientSecret: keys.google.secret,
        callbackURL: '/auth/google/redirect'
    },async (accessToken, freshToken, profile, done) => {
        try {
            await User.findOne({googleId: profile.id}).then((currentUser) => {
                if (currentUser) {
                    console.log("current User is",currentUser);
                    return done(null, currentUser);
                }else{
                    new User({
                        googleId: profile.id,
                        name: profile.displayName
                    }).save().then((user) => {
                        console.log("new User is",user);
                        return done(null, user);
                    })
                }
            })
        } catch (error) {
            console.log('Error is: ', error);
        }
    })
);