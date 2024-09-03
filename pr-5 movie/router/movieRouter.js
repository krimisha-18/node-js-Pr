const express = require('express'); // IMPORT EXPRESS MODULE
const { ViewMovie, AddMovie, insertMovie, deleteMovie, editMovie, UpdateMovie } = require('../controller/movieController'); // IMPORT CONTROLLER FUNCTIONS

const routes = express.Router(); // CREATE A NEW ROUTER INSTANCE

// FILE UPLOAD SETUP USING MULTER
const multer = require('multer'); // IMPORT MULTER FOR HANDLING FILE UPLOADS

// CONFIGURE WHERE TO STORE UPLOADED FILES AND HOW TO NAME THEM
const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads'); // SET UPLOAD DESTINATION FOLDER TO 'uploads'
    },
    filename: (req, file, cb) => {
        const uniqname = Date.now(); // GENERATE UNIQUE NAME BASED ON CURRENT TIME
        cb(null, `${file.fieldname}-${uniqname}`); // NAME THE FILE WITH FIELD NAME AND UNIQUE TIMESTAMP
    }
});

// SET UP MULTER WITH CONFIGURED STORAGE AND SINGLE FILE UPLOAD HANDLER
const fileUpload = multer({ storage: st }).single('image');

// DEFINE ROUTES FOR MOVIE APPLICATION
routes.get('/', ViewMovie); // ROUTE TO VIEW ALL MOVIES
routes.get('/add', AddMovie); // ROUTE TO SHOW ADD MOVIE FORM

routes.post('/insertMovie', fileUpload, insertMovie); // ROUTE TO INSERT A NEW MOVIE (WITH FILE UPLOAD)
routes.get('/deleteMovie', deleteMovie); // ROUTE TO DELETE A MOVIE
routes.get('/editMovie', editMovie); // ROUTE TO SHOW EDIT MOVIE FORM
routes.post('/UpdateMovie', fileUpload, UpdateMovie); // ROUTE TO UPDATE A MOVIE (WITH FILE UPLOAD)

// EXPORT ROUTES TO BE USED IN OTHER PARTS OF THE APPLICATION
module.exports = routes;
