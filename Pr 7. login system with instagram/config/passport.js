const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return done(null, false, { message: 'Invalid credentials' });
        }
        return done(null, user);
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });
};
