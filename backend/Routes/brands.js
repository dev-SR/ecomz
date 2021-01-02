//Routes/auth.js
const router = require('express').Router();
//Middleware
const { admin } = require('../Middleware/admin');
const { protect } = require('../Middleware/protect');
//Controller
const {
   getAllBrands,
   createBrands,
   updateBrands,
   deleteBrands
} = require('../Controllers/brands');

router.route('/').get(getAllBrands).post(protect, admin, createBrands);

router
   .route('/:id')
   .put(protect, admin, updateBrands)
   .delete(protect, admin, deleteBrands);

module.exports = router;
