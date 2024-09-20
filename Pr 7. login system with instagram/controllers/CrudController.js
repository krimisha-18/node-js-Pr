// Import the BlogModle for interacting with the blog data
const BlogModle = require('../models/crudModel');
const fs = require('fs'); // File system module to handle file operations
const path = require('path'); // Path module to work with file paths

// Function to render the Add Blog page
const AddBlog = (req, res) => {
    // Render the "Addblog" view/template
    return res.render("Addblog");
}

// Function to fetch and display all blogs
const Showblog = async (req, res) => {
    try {
        // Fetch all blogs from the database
        const blog = await BlogModle.find();
        // Render the "Showblog" view/template with the list of blogs
        res.render('Showblog', { blog: blog });
    } catch (error) {
        // Log any errors that occur
        console.log(error);
        return false; // Indicate that something went wrong
    }       
}

// Function to insert a new blog into the database
const insertBlog = async (req, res) => {
    try {
        // Extract title and description from the request body
        const { title, description } = req.body;
        // Create a new blog entry with the provided title, description, and image file path
        await BlogModle.create({
            title: title,
            description: description,
            image: req.file.path
        });
        // Log success message
        console.log("Blog Add successfully");
        // Redirect to the admin page
        return res.redirect('/admin');
    } catch (err) {
        // Log any errors that occur
        console.log(err);
        return false; // Indicate that something went wrong
    }
}

// Function to delete a blog from the database
const deleteBlog = async (req, res) => {
    try {
        // Get the ID of the blog to delete from the query parameters
        const deid = req.query.deletId;
        // Find the blog by its ID
        let single = await BlogModle.findById(deid);
        // Delete the image file from the server
        fs.unlinkSync(single.image);
        // Delete the blog entry from the database
        await BlogModle.findByIdAndDelete(deid);
        // Log success message      
        console.log("Deleted..");
        // Redirect to the admin page
        return res.redirect('/admin');
    } catch (error) {
        // Log any errors that occur
        console.log(error);
        return false; // Indicate that something went wrong
    }
}

// Function to fetch a single blog for editing
const editBlog = async (req, res) => {
    try {
        // Get the ID of the blog to edit from the query parameters
        const eid = req.query.editId;
        // Find the blog by its ID
        const single = await BlogModle.findById(eid);
        // Render the "Editblog" view/template with the blog data
        return res.render('Editblog', { single });
    } catch (error) {
        // Log any errors that occur
        console.log(error);
        return false; // Indicate that something went wrong
    }
}

// Functiosn to update an existing blog in the database
const UpdateBlog = async (req, res) => {
    try {
        // Extract data from the request body
        const { editid, title, description } = req.body;
        // Check if a new image file was uploaded
        if (req.file) {
            // Find the current blog entry by its ID
            const single = await BlogModle.findById(editid);
            // Delete the old image file from the server
            fs.unlinkSync(single.image);
            // Update the blog entry with the new title, description, and image file path
            await BlogModle.findByIdAndUpdate(editid, {
                title: title,
                description: description,
                image: req.file.path
            });
            // Log success message
            console.log("Updated..");
            return res.redirect('/admin');
            // Redirect to the admin page
        } else {
            // If no new image was uploaded, keep the old image
            const single = await BlogModle.findById(editid);
            await BlogModle.findByIdAndUpdate(editid, {
                title: title,
                description: description,
                image: single.image
            });
            // Log success message
            console.log("Updated..");
            // Redirect to the admin page
            return res.redirect('/admin');
        }
    } catch (err) {
        // Log any errors that occur
        console.log(err);
        return false; // Indicate that something went wrong
    }
}

// Export all functions to be used in other parts of the application
module.exports = {
    AddBlog,
    insertBlog,
    Showblog,
    deleteBlog,
    editBlog,
    UpdateBlog
};
