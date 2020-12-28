//Routes/auth.js
const router = require('express').Router();

//Controller
const { register, validate, login } = require('../Controllers/auth');
// validate('register');
router.route('/register').post(validate('register'), register);
router.route('/login').post(validate('login'), login);

module.exports = router;
