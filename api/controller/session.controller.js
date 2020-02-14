const Sessions = require('../../models/sessions.model');

//GET SESSIONS
module.exports.sessions = async (req, res) => {
    try {
        await Sessions.find().then((sessions) => {
            return res.json(sessions);
        })


    } catch (error) {
        console.log('ERROR IS ', error);
    }
};

//GET A SESSION BY SESSIONID
module.exports.session = async (req, res) => {
    try {
        let id = req.params.sessionId;

        await Sessions.findById(id).then((session) => {
            return res.json(session);
        });

    } catch (error) {
        console.log('ERROR IS ', error);
        res.send('sever wrong');
    }
};

//ADD NEW SESSION INTO SESSIONS
module.exports.create = async (req, res) => {
    try {
        let sessionId = req.headers.cookie.split('=').splice(1).join('');
        let productId = req.body.productId;

        let data = {
            sessionId: sessionId,
            cart:{
                [productId]: 1
            }
        };

        await Sessions.findOne({ sessionId: data.sessionId }).then(async (currentSession) => {
            if (currentSession) {

                let cart = await currentSession.cart;

                if (cart) {
                    for (const key in cart) {
                        if (key === productId) {
                            await Sessions.findOneAndUpdate(
                                { sessionId: sessionId },
                                {
                                    $set: {
                                        ['cart.' + productId]: cart[key] + 1
                                    }
                                }
                            );
                            await currentSession.save();
                            return res.json(currentSession);
                        }
                    }

                    await Sessions.findOneAndUpdate(
                        { sessionId: sessionId },
                        {
                            $set: {
                                ['cart.' + productId]: 1
                            }
                        }
                    );
                    return res.json(currentSession);

                } else {
                    await Sessions.findOneAndUpdate(
                        { sessionId: sessionId },
                        {
                            $set: {
                                ['cart.' + productId]: 1
                            }
                        }
                    );
                    return res.json(currentSession);
                }

                console.log(currentSession);
            } else {
                await new Sessions(data).save().then((item) => {
                    console.log('new session', item);
                    return res.json(item);
                });
            }
        });

    } catch (error) {
        console.log("error is: ", error);
    };
};