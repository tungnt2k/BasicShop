const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const config = require('config');
const bcryptjs = require('bcryptjs');

const PORT = process.env.PORT || 3000;
const app = express();

const connectDB = require('./config/db');
connectDB();

//Create admin user 
// const User = require('./models/User');
// const salt = bcryptjs.genSaltSync(10);
// const adminUser = new User({
//     name: "admin",
//     email: "admin@test.com",
//     password: "123456",
//     type: "ad"
// });
// adminUser.password = bcryptjs.hashSync(adminUser.password, salt);
// adminUser.save();

//passport google
const passportGoogle = require('./config/passport-google');

//middlewares
const adminMiddlewares = require('./middlewares/authAdmin');
const authApiMiddleware = require('./middlewares/authApi.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

// Routes
const homeRoutes = require('./routes/home.routes');
const adminRoutes = require('./routes/admin.routes');
const productRoutes = require('./routes/product.route');
const adminProductRoutes = require('./routes/adminProduct.routes');
const apiRoutes = require('./routes/api.routes');
const adminCateRoutes = require('./routes/adminCate.routes');
const cartRoutes = require('./routes/cart.routes');
const userLogin = require('./routes/userLogin.router');

// api router
const apiCartRouter = require('./api/routes/cart.routes');
const apiSessionRouter = require('./api/routes/session.route');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', express.static('./public'));
app.use(logger('dev'));
app.use(session(
    {
        secret: config.get('Secret'),
        resave: true,
        key: 'user',
        saveUninitialized: true,
        cookie: {
            maxAge: 50*60*1000
        }
    }
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', userLogin);
app.use('/', homeRoutes);
app.use('/products', productRoutes);
app.use('/products/cart', cartRoutes);


app.use('/admin', adminRoutes);
app.use('/admin/cates', adminMiddlewares, adminCateRoutes);
app.use('/admin/products', adminMiddlewares, adminProductRoutes);
app.use('/api', apiRoutes);
app.use('/api', apiCartRouter);
app.use('/api/sessions', apiSessionRouter);

app.listen(PORT, (err) => {
    if (err) {
        console.error('Something error !!');
        console.error(err);
    };
    console.log('Example app listen on port :' + PORT)
})