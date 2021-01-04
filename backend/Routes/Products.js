//Routes/auth.js
const router = require('express').Router();
//Middleware
const { admin } = require('../Middleware/admin');
const { protect } = require('../Middleware/protect');
//Controller
const {
   getProduct,
   getAllProducts,
   getAllTopProducts,
   createProducts,
   updateProducts,
   deleteProducts
} = require('../Controllers/Products');

router.route('/').get(getAllProducts).post(protect, admin, createProducts);
router.route( '/top' ).get( getAllTopProducts );
router.route('/single/:id').get(getProduct);

router
   .route('/edit/:id')
   .put(protect, admin, updateProducts)
   .delete(protect, admin, deleteProducts);

module.exports = router;
