const express = require('express');
const { ViewSubcatagorypage, Addsubatagorypage,insertSubcategory,deletSubCatagory, statusChange, editSubCatagory,updateSubcategory } = require('../controllers/SubcategoryController');

const routes = express.Router();

routes.get('/',ViewSubcatagorypage)
routes.get('/add',Addsubatagorypage)
routes.post('/insertSubcategory',insertSubcategory)
routes.get('/deletSubCatagory',deletSubCatagory)
routes.get('/statusChange',statusChange)
routes.get('/editSubCatagory',editSubCatagory)
routes.post('/updateSubcategory',updateSubcategory)



module.exports = routes;