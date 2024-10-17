const express = require('express');
const { postEmail, otpPage, postOtp, newPassword, postNewPass } = require('../controllers/Forgotcontroller');

const routes = express.Router();

routes.post('/postEmail', postEmail);
routes.get('/otp',otpPage)
routes.post('/postOtp',postOtp)
routes.get('/newpass',newPassword)
routes.post('/postNewPass',postNewPass)


module.exports = routes;