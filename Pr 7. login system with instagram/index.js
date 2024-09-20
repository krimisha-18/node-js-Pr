const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const initializePassport = require('./config/passport');
const blogRoutes = require('./routes/blogs');
const userRoutes = require('./routes/users');

const app = express();
connectDB();

initializePassport(passport);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRoutes);
app.use('/admin', blogRoutes);

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
