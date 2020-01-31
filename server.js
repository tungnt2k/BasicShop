const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;
const app = express();

const connectDB = require('./config/db');
connectDB();

const homeRoutes = require('./routes/home.routes');
const adminRoutes = require('./routes/admin.routes');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', homeRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, (err) => {
    if (err) {
        console.error('Something error !!');
        console.error(err);
    };
    console.log('Example app listen on port :' + PORT)
})