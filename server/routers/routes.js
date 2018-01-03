const app = require('../app');
const AuthController = require('../controllers/authController');
const SignMiddleware = require('../middlewares/signupMiddleware');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

function routes(app) {

    app.get('/', requireAuth, function (req, res) {
        res.send({ hi: 'buddy' })
    })

    app.post('/api/signin', requireSignin, AuthController.signin);

    app.post('/api/signup', AuthController.userExistance);
    app.use(SignMiddleware)
}

module.exports = routes;