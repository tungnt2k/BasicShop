const Sessions = require('../models/sessions.model');

module.exports = async (req, res, next) => {
    if (!req.headers.cookie) {
        res.redirect('/products')
        return;
    }

    let sessionId = req.headers.cookie.split('=').splice(1).join('');
    let sessionStore = await Sessions.findOne({
        sessionId: sessionId
    });

    if (!sessionStore) {
        let newSession = await new Sessions({
            sessionId: sessionId
        });
        await newSession.save();
    }
    next();
};