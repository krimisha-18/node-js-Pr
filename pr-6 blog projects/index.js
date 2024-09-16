// Import the necessary modules
const express = require("express"); 
const connectDB = require("./config/db");

// Create an instance of the Express application
const app = express();

const port = 9000;
connectDB();

// Set up EJS as the view engine for rendering HTML templates
app.set('view engine', 'ejs');

// Import the path module for handling file and directory paths
const path = require('path');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Serve static files (like images)
app.use(express.static(path.join(__dirname, 'public')));

// Use middleware to parse URL-encoded data (from forms) and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve files from the 'uploads' directory at the '/uploads' URL path
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

// Use routes defined in the 'indexRoutes' file for handling requests to the root URL
app.use('/', require('./routes/indexRoutes'));

// Start the server and listen for incoming requests on the specified port
app.listen(port, (err) => {
    if (err) {
        console.log(err); // Log any errors that occur while starting the server
    }

    console.log(`Server is running on port ${port}`); // Log a message when the server starts successfully
});
