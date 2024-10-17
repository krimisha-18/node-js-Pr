const passport = require('passport')
const passportLocal = require('passport-local').Strategy

const UserModel = require('../models/UserModel')
passport.use(new passportLocal({
    usernameField: 'email',
}, async(email, password, done) => {
        try {
            const user = await UserModel.findOne({ email: email })
            if (!user ||user.password != password) {
                console.log('Invalid email or password' );
                
                return done(null, false)

            }
        return done(null,user)

          
           
        } catch (error) {
            console.log(error);
            return done(null, false)
        }
    }
))

passport.serializeUser((user,done)=>{
    done(null,user._id)
})
passport.deserializeUser(async(id,done)=>{
    try {
        const user = await UserModel.findById(id)
        done(null,user)
        
    } catch (error) {
        console.log(error);
        return done(null,false)
    }
})

passport.checkUser = (req,res,next) =>{
    if(!req.isAuthenticated()){
        return res.redirect('/')
    }
   return next();
}

passport.setUser = (req,res,next) =>{
    if(req.isAuthenticated()){
        res.locals.users = req.user
    }
    return next();
}
module.exports = passport