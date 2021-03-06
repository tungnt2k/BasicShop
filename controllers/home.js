const Sessions = require('../models/sessions.model');

module.exports.index = async (req, res) => {
    let sessionId = req.headers.cookie.split('=')[1].split(';')[0];
    let count = 0;
    let sessions = await Sessions.findOne({sessionId: sessionId});
    if (sessions.cart) {
        for (const key in sessions.cart) {
            count = count + sessions.cart[key];
        }
    }

    res.render('pages/index',{
        count: count
    })
}