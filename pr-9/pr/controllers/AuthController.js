
const UserModel = require('../models/authModel')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please fill all the fields"
            })
        }
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).send({
                success: false,
                message: "Email already exists"
            })
        }
        await UserModel.create({
            name: name,
            email: email,
            password: password
        })
        res.status(200).send({
            success: true,
            message: "User Added Successfully"

        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })


    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please fill all the fields"
            })
        }
        const user = await UserModel.findOne({ email : email })
        if (!user || user.password!=password) {
            return res.status(400).send({
                success: false,
                message: "Invalid Email or Password"
            })
        }
        const token = await jwt.sign({ user: user }, "secret-key",
            {
                expiresIn: '1h'
                }
                );
                res.status(200).send({
                    success: true,
                    message: "token is hear",
                    token: token
                    })

    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    register, login
}   