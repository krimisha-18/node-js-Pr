const express = require('express');
const { register, login } = require('../controllers/AuthController');

const routes = express.Router();
const {veryfyToken} = require('../middleware/Auth') 

routes.post('/register',register);
routes.post('/login',login);

module.exports = routes


