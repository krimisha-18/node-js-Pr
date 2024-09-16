// Import the UserModel and BlogModel for interacting with user and blog data
const UserModel = require('../models/authModel');
const BlogModle = require('../models/crudModel');

// Function to render the Login page
const LoginPage = (req, res) => {
    // Check if the user is already logged in by checking the 'auth' cookie
    if (req.cookies['auth']) {
        // If the user is logged in, redirect to the admin page
        return res.redirect('/admin');
    }
    // If not logged in, render the login page
    return res.render('login');
}

// Function to render the Register page
const RegisterPage = (req, res) => {
    // Render the registration page where new users can sign up
    return res.render('register');
}

// Function to register a new user
const registerUser = async (req, res) => {
    // Extract user details from the request body
    const { name, email, password } = req.body;
    // Create a new user entry in the database
    UserModel.create({
        name: name,
        email: email,
        password: password
    });
    // Log success message
    console.log("User Registered");
    // Redirect the user to the login page
    return res.redirect('/');
}

// Function to handle user login
const loginUser = async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;
    // Find a user in the database by their email address
    const user = await UserModel.findOne({ email: email });
    // Check if the user exists and the password matches
    if (!user || user.password != password) {
        // If the email or password is incorrect, log an error and redirect to login page
        console.log("Invalid Email or Password");
        return res.redirect('/');
    }
    // If login is successful, set an 'auth' cookie with user details
    res.cookie('auth', user);
    // Redirect to the admin page
    return res.redirect('/admin');
}

// Function to render the Dashboard page
const DashboardPage = (req, res) => {
    // Check if the user is logged in by checking the 'auth' cookie
    if (!req.cookies['auth']) {
        // If not logged in, redirect to the login page
        return res.redirect('/');
    }
    // Fetch all blog posts from the database
    const blog = BlogModle.find();
    // Render the 'Showblog' page with the blog data
    res.render('Showblog', { blog: blog });
}

// Function to handle user logout
const Logout = async (req, res) => {
    // Clear the 'auth' cookie to log the user out
    res.clearCookie('auth');
    // Redirect to the login page
    return res.redirect('/');
}

// Export all functions so they can be used in other parts of the application
module.exports = {
    LoginPage,
    RegisterPage,
    DashboardPage,
    registerUser,
    loginUser,
    Logout
};
