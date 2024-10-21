const express = require('express');
const { addcategory, viewcategory } = require('../controllers/CategoryController');

const routes = express.Router();

routes.post('/addcategory',addcategory)
routes.get('/viewcategory',viewcategory)


module.exports = routes


