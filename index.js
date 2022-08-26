const express = require('express'); 
const app = express();

const db = require('./db/db');
const session = require('express-session'); 
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(express.json())
app.use(cookieParser())

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL, collection: 'sessions' })
}))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));

const authroutes = require('./routes/authroutes');
const itemroutes = require('./routes/itemroutes');
const cartroutes = require('./routes/cartroutes');
const adminroutes = require('./routes/adminroutes');

app.use('/auth', authroutes);
app.use('/items', itemroutes); 
app.use('/cart', cartroutes);
app.use('/admin', adminroutes);




app.listen(process.env.PORT, function () {
    console.log('backend -- up and running')
})
