const express = require('express');
const MovieModule = require('../model/MovieModel');
const fs = require('fs');
const path = require('path');

// FUNCTION TO VIEW ALL MOVIES
const ViewMovie = async (req, res) => {
    try {
        // FIND ALL MOVIES FROM THE DATABASE
        const movies = await MovieModule.find();
        // RENDER THE 'viewMovie' TEMPLATE WITH THE MOVIES DATA
        return res.render('viewMovie', {
            movies
        });
    } catch (error) {
        console.log(error); // LOG ANY ERROR THAT OCCURS
        return false; // RETURN FALSE IF AN ERROR OCCURS
    }
};

// FUNCTION TO SHOW THE ADD MOVIE FORM
const AddMovie = (req, res) => {
    return res.render('addMovie'); // RENDER THE 'addMovie' TEMPLATE
};

// FUNCTION TO INSERT A NEW MOVIE INTO THE DATABASE
const insertMovie = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        // CREATE A NEW MOVIE ENTRY IN THE DATABASE
        await MovieModule.create({
            name: name,
            description: description,
            price: price,
            image: req.file.path // SAVE THE IMAGE PATH FROM THE UPLOADED FILE
        });
        console.log("MOVIES ADDED....!!!"); // LOG SUCCESS MESSAGE
        return res.redirect('/'); // REDIRECT TO THE HOME PAGE
    } catch (error) {
        console.log(error); // LOG ANY ERROR THAT OCCURS
        return false; // RETURN FALSE IF AN ERROR OCCURS
    }
};

// FUNCTION TO DELETE A MOVIE FROM THE DATABASE
const deleteMovie = async (req, res) => {
    try {
        const deid = req.query.deletId; // GET MOVIE ID FROM QUERY PARAMETER
        let single = await MovieModule.findById(deid); // FIND THE MOVIE BY ID
        fs.unlinkSync(single.image); // DELETE THE IMAGE FILE FROM THE FILE SYSTEM
        await MovieModule.findByIdAndDelete(deid); // DELETE THE MOVIE ENTRY FROM THE DATABASE
        console.log("MOVIES DELETED.....!!!!!"); // LOG SUCCESS MESSAGE
        return res.redirect('/'); // REDIRECT TO THE HOME PAGE
    } catch (error) {
        console.log(error); // LOG ANY ERROR THAT OCCURS
        return false; // RETURN FALSE IF AN ERROR OCCURS
    }
};

// FUNCTION TO SHOW THE EDIT MOVIE FORM
const editMovie = async (req, res) => {
    try {
        const eid = req.query.editId; // GET MOVIE ID FROM QUERY PARAMETER
        const single = await MovieModule.findById(eid); // FIND THE MOVIE BY ID
        // RENDER THE 'editMovie' TEMPLATE WITH THE MOVIE DATA
        return res.render('editMovie', {
            single
        });
    } catch (error) {
        console.log(error); // LOG ANY ERROR THAT OCCURS
        return false; // RETURN FALSE IF AN ERROR OCCURS
    }
};

// FUNCTION TO UPDATE A MOVIE IN THE DATABASE
const UpdateMovie = async (req, res) => {
    try {
        const { name, description, price, editid } = req.body;
        if (req.file) { // CHECK IF A NEW IMAGE FILE WAS UPLOADED
            const single = await MovieModule.findById(editid); // FIND THE MOVIE BY ID
            fs.unlinkSync(single.image); // DELETE THE OLD IMAGE FILE FROM THE FILE SYSTEM
            // UPDATE THE MOVIE ENTRY WITH NEW DATA AND NEW IMAGE
            await MovieModule.findByIdAndUpdate(editid, {
                name: name,
                description: description,
                price: price,
                image: req.file.path
            });
            console.log("MOVIE UPDATED....!!!"); // LOG SUCCESS MESSAGE
        } else {
            const single = await MovieModule.findById(editid); // FIND THE MOVIE BY ID
            fs.unlinkSync(single.image); // DELETE THE OLD IMAGE FILE FROM THE FILE SYSTEM
            // UPDATE THE MOVIE ENTRY WITH NEW DATA BUT KEEP OLD IMAGE
            await MovieModule.findByIdAndUpdate(editid, {
                name: name,
                description: description,
                price: price,
                image: single.image
            });
            console.log("UPDATE....!!!"); // LOG SUCCESS MESSAGE
        }
        return res.redirect('/'); // REDIRECT TO THE HOME PAGE
    } catch (error) {
        console.log(error); // LOG ANY ERROR THAT OCCURS
        return false; // RETURN FALSE IF AN ERROR OCCURS
    }
};

// EXPORT ALL THE FUNCTIONS TO BE USED IN OTHER PARTS OF THE APPLICATION
module.exports = {
    ViewMovie,
    AddMovie,
    insertMovie,
    deleteMovie,
    editMovie,
    UpdateMovie
};krimsib
