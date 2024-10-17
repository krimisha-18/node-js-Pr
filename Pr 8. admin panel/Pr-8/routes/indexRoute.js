const express = require('express');

const routes = express.Router();

routes.use('/', require('./authRoute'));
routes.use('/forgot', require('./forgotRoute'));
routes.use('/category', require('./catagoryRoute'));
routes.use('/subcategory', require('./subcategoryRoutes'));
routes.use('/exsubcategory', require('./exsubcategoryRoute'));
routes.use('/product', require('./productRoute'));

module.exports = routes;