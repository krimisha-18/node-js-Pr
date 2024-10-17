const UserModel = require('../models/UserModel');

const nodemailer = require('nodemailer')

const postEmail = async (req, res) => {
    try {
        console.log(req.body.forgotemail);
        const email = req.body.forgotemail;
        const user = UserModel.findOne({ email: email })
        if (!user) {
            console.log("User not found");
            return res.redirect('/');
        }
        const otp = Math.floor(Math.random() * 1000000);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'khushbuzalavadiya8@gmail.com',
                pass: 'hsuy pkof cqwz ebno'
            }
        });

        var mailOptions = {
            from: 'khushbuzalavadiya8@gmail.com',
            to: email,
            subject: 'Send Otp',
            html: `<h1>Hello ${user.name} Your Otp :- ${otp}</h1>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {

                console.log('Email sent: ' + info.response);
                let obj = {
                    email: email,
                    otp: otp
                }
                res.cookie('otp', obj)
                res.redirect('/forgot/otp')
            }
        })


    } catch (error) {
        console.log(error);
        return false

    }
}
const otpPage = (req, res) => {
    // after login can not access login page again
    if (res.locals.users) {
        res.redirect('/dashboard');
    }
    // without request for otp , can not access otp page 
    if (!req.cookies.otp) {
        return res.redirect('/')
    }
    return res.render('otp')

}

const postOtp = async (req, res) => {
    try {
        let otp = req.body.otp;

        if (req.cookies.otp.otp == otp) {
            return res.redirect('/forgot/newpass')
        } else {
            console.log("Otp is Wrong");

            return res.redirect('/forgot/otp');
        }

    } catch (error) {
        console.log(error);
        return false;

    }
}

const newPassword = (req, res) => {
    // after login can not access login page again
    if (res.locals.users) {
        res.redirect('/dashboard');
    }

    // without request for otp , can not access newpass page 
   if (!req.cookies.otp) {
        return res.redirect('/')
    }
    return res.render('newpassword')
}
const postNewPass = async (req, res) => {
    try {
        const { newpass, cpass } = req.body
        const email = req.cookies.otp.email
        // console.log(req.body);
        if (newpass == cpass) {
            await UserModel.findOneAndUpdate({ email: email }, {
                password: newpass
            });
            res.clearCookie('otp');
            return res.redirect('/')
        } else {
            console.log("Password and Confirm Password are not same");
            req.flash('success', "Password and Confirm Password are not same");
            return res.redirect('/forgot/newpass')

        }

    } catch (error) {
        console.log(error);
        return false;

    }

}
module.exports = {
    postEmail, otpPage, postOtp, newPassword, postNewPass

}