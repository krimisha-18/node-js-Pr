const express = require('express');
const { ViewExsubcatagorypage, AddExsubatagorypage, insertExsubcategory, deletExsubCatagory ,statusChange, editExsubCatagory, updateExsubcategory, categoryWiseFilter} = require('../controllers/ExsubcategoryController');

const routes = express.Router();

routes.get('/',ViewExsubcatagorypage)
routes.get('/add',AddExsubatagorypage)
routes.post('/insertExsubcategory',insertExsubcategory)
routes.get('/deletExsubCatagory',deletExsubCatagory)
routes.get('/statusChange',statusChange)
routes.get('/editExsubCatagory',editExsubCatagory)
routes.post('/updateExsubcategory',updateExsubcategory)
routes.get('/categoryWiseFilter',categoryWiseFilter)



module.exports = routes;