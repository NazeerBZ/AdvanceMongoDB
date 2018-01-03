const jwt = require('jwt-simple');
const RegisteredUsers = require('../models/registeredUsers');
const config = require('../config');

function tokenForUser(createdUser) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: createdUser.id, iat: timestamp }, config.secret)
}

module.exports = {

    userExistance(req, res, next) {
        const userEmail = req.body.email;
        const userPassword = req.body.password;

        RegisteredUsers.findOne({ email: userEmail }, (err, existingUser) => {

            if (err) {
                return next(err)
            }

            if (existingUser) {
                return res.status(422).send({ error: "this email address already Exist" })
            }

            RegisteredUsers.create({
                email: userEmail,
                password: userPassword
            })
                .then((createdUser) => { res.send({ token: tokenForUser(createdUser) }) })
                .catch(next)
        })
    },

    signin(req, res, next) {
        //Here user has already had their email and password authenticated
        //we just need to give them a token
        res.send({ token: tokenForUser(req.user) })

    }
}




