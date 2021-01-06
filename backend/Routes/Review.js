//Routes/auth.js
const router = require('express').Router();
//Middleware
const { protect } = require('../Middleware/protect');
//Controller
const { getRating } = require('../Controllers/Review');

router.route('/rating/:id').get(getRating);

module.exports = router;
