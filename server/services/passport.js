const passport = require('passport');
const RegisteredUsers = require('../models/registeredUsers');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create Local Strategy
const localOptions = {
    usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
    //Verify this email and password
    //if it is correct email and password, call done with the user,
    //otherwise, call done with false

    RegisteredUsers.findOne({ email: email }, function (err, user) {
        if (err) { return done(err) }
        if (user) {

            //compare passwords - is 'password' is equal to RegisteredUsers.password? 
            user.comparePassword(password, function (err, isMatch) {
                if (err) { return done(err) }

                if (isMatch) {
                    done(null, user)
                }
                else {
                    done(null, false);
                }
            })
        }
        else {
            done(null, false)
        }
    });
});

//setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

//create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    //see if the user id in the payload exists in our database
    //if it does, call 'done' with that other
    //otherwise, call 'done' without a user object
    RegisteredUsers.findById(payload.sub, function (err, user) {

        if (err) { return done(err, false) }

        if (user) {
            done(null, user)
        }
        else {
            done(null, false);
        }
    });
});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin)