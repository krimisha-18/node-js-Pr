const express = require("express");
const connectDB = require("./config/db");
const app = express()
const port = 9000 ;
connectDB()

app.set('view engine','ejs')
const path = require('path');


const cookieParser = require('cookie-parser')
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')))


app.use(express.urlencoded());
app.use(express.json());

app.use('/uploads',express.static(path.join(__dirname,"uploads")));

const passport = require('passport');
const session = require('express-session');
const passportLocal = require('./config/passportLocal')

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 24*60*60*1000
    }

}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser)

app.use('/',require('./routes/indexRoutes'))

app.listen(port,(err) =>{
    if(err) console.log(err);

    console.log(`server is running on port ${port}`)
})
