

function SignMiddleware(err, req, res, next) {

    res.status(422).send({error: err._message});
}

module.exports = SignMiddleware