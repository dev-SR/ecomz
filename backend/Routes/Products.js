//Routes/auth.js
const router = require('express').Router();
//Middleware
const { admin } = require('../Middleware/admin');
const { protect } = require('../Middleware/protect');
//Controller
const {
   getAllProducts,
   createProducts,
   updateProducts,
   deleteProducts
} = require('../Controllers/Products');

router.route('/').get(getAllProducts).post(protect, admin, createProducts);

router
   .route('/:id')
   .put(protect, admin, updateProducts)
   .delete(protect, admin, deleteProducts);

module.exports = router;
