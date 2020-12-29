//Routes/auth.js
const router = require('express').Router();
//Middleware
const { admin } = require('../Middleware/admin');
const { protect } = require('../Middleware/protect');
//Controller
const {
   getAllCategory,
   createCategory,
   updateCategory,
   deleteCategory,
   getAllSubCategory,
   createSubCategory
} = require('../Controllers/category');

router
   .route('/parent')
   .get(protect, admin, getAllCategory)
   .post(protect, admin, createCategory)
   .delete( protect, admin, deleteCategory );
    
router.route('/parent/:id').put(protect, admin, updateCategory);
router.route('/sub').get(protect, admin, getAllSubCategory);
router.route('/sub/:parentId').post(protect, admin, createSubCategory);

module.exports = router;
