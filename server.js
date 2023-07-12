const dotenv = require('dotenv');
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require("express-ejs-layouts");

const PORT = process.env.PORT || 3300;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');

//  dotenv configuration
dotenv.config();

// Database Connection
const url = "mongodb+srv://anirbandev:1234@cluster0.3jpx1eh.mongodb.net/pizza?retryWrites=true&w=majority";
mongoose.connect(url).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});


// Session store
let mongoStore = MongoDbStore.create({
    mongoUrl: url,
    collection: 'session'
})

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));


app.use(flash());

// Assets
app.use(express.static('public'));
app.use(express.json());

//Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

require('./routes/web')(app);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});