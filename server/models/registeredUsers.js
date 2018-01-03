const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const Register = new Schema({

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})


//on Save hook, encrypt password
//Before saving a Model, run this function
Register.pre('save', function (next) {
    //get access to registeredUsers Model
    const registeredUsers = this

    //generated a Salt then run call back function
    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err) }

        //hash (encrypt) our password using salt
        bcrypt.hash(registeredUsers.password, salt, null, function (err, hash) {
            if (err) { return next(err) }

            //overwrite plain text password with encrypted password
            registeredUsers.password = hash;
            next();
        });
    });
});

Register.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err) }

        callback(null, isMatch);
    });
}

//create a model class
const RegisteredUsers = mongoose.model('registeredUsers', Register);
module.exports = RegisteredUsers;







