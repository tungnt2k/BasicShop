const Sessions = require('../models/sessions.model');

module.exports.index = async (req, res) => {
    let sessionId = req.headers.cookie.split('=').splice(1).join('');
    let count = 0;
    let sessions = await Sessions.findOne({sessionId: sessionId});
    if (sessions.cart) {
        for (const key in sessions.cart) {
            count = count + sessions.cart[key];
        }
    }

    res.render('products/cart', {
        count: count
    });
}

module.exports.addProduct = async (req, res, next) => {
    try{
        let sessionId = req.headers.cookie.split('=').splice(1).join('');
        let productId = req.params.productId;
        let sessionStore = await Sessions.findOne({
            sessionId: sessionId
        });

        if (!sessionStore) {
            res.status(402).send({messge: "sessions don't exits"});
            res.redirect('/products');
            return;
        }
        
        let cart = await sessionStore.cart;

        if (cart) {
            for (const key in cart) {
                if (key === productId) { 
                    await Sessions.findOneAndUpdate(
                        {sessionId: sessionId},
                        { $set: { 
                                    ['cart.' + productId ]: cart[key] + 1
                                }
                        }
                    );  
                    await sessionStore.save();
                    res.redirect('/products');   
                    return;
                }
            }

            await Sessions.findOneAndUpdate(
                {sessionId: sessionId},
                { $set: { 
                            ['cart.' + productId ]: 1 
                        }
                }
            );  

        }else{
            await Sessions.findOneAndUpdate(
                {sessionId: sessionId},
                { $set: { 
                            ['cart.' + productId ]: 1 
                        }
                }
            );
        }

        await sessionStore.save();
        res.redirect('/products');
    }catch(error){
        console.log(error);
        res.send("Not add product");
    };
};