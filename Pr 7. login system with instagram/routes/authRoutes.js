const express = require('express');
const { LoginPage, RegisterPage, registerUser, Showblog, loginUser, Logout } = require('../controllers/AuthController');

const routes = express.Router();
const passport =require('passport')


routes.get('/',LoginPage);
routes.get('/register',RegisterPage)
routes.get('/admin',passport.checkUser,Showblog);

routes.post('/registerUser',registerUser);
routes.post('/loginUser',passport.authenticate('local',{failureRedirect:'/'}),loginUser);
routes.get('/logout',Logout)
module.exports = routes


