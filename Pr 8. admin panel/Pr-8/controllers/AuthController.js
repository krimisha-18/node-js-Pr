const UserModel = require('../models/UserModel');

const loginPage = (req, res) => {
    if(res.locals.users){
        res.redirect('/dashboard');
    }
    return res.render('index')
}
const registerPage = (req, res) => {
    return res.render('register')
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;
        // console.log(req.body);
        const existingUser = await UserModel.findOne({ email });

    if (existingUser) 
    {
            req.flash('success', "User already exists");
            return false;
    }
    
    await UserModel.create({
            name: name,
            email: email,
            password: password,
            cpassword: cpassword
        })
        req.flash('success', "User successfully register");
        return res.redirect('/')
        
    } catch (err) {
        console.log(err);
        return false;
    }
}
    const loginUser = (req,res) => {
        return res.redirect('/dashboard')
    }

    const dashboardPage = (req,res) =>{ 
        return res.render('dashboard')
    }
    
module.exports = {
    loginPage, registerPage, registerUser,loginUser,dashboardPage
}