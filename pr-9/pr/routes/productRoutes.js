const express = require('express');
const { addproduct, viewproduct } = require('../controllers/ProductController');

const routes = express.Router();

routes.post('/addProduct',addproduct)
routes.get('/viewProduct',viewproduct)


module.exports = routes


