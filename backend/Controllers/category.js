//Controller/category.js
const _ = require('lodash');
// Importing User Model
const CategoryRepo = require('../Model/Categories');
// Import Error Class
const ErrorResponse = require('../Utils/ErrorResponse');
//async handler
const asyncHandler = require('express-async-handler');

/**
 @desc       Get all Categories
 @route      GET: {{URL}}/api/v1/category/parent
 @access     Private Admin
 */
exports.getAllCategory = asyncHandler(async (req, res, next) => {
   const r = await CategoryRepo.getAllCategories();
   res.json({ success: true, cat: r });
});

/**
 @desc       Create new Categories
 @route      POST: {{URL}}/api/v1/category/parent
 @access     Private Admin
 */
exports.createCategory = asyncHandler(async (req, res, next) => {
   // const categoryName = req.params;
   // const query = req.query;
   // const [priceLower, priceUpper] = req.query.price.split(',');
   // console.log(priceLower);
   // console.log(priceUpper);
   const { newCat } = req.body;
   // if (found) return next(new ErrorResponse('Categories Already Exists', 401));
   try {
      const r = await CategoryRepo.createCategories(newCat);
      res.json({ success: true, cat: r });
   } catch (err) {
      const r = await CategoryRepo.getAllCategories();
      return res.json({
         success: true,
         cat: r,
         error: 'Categories Already Exists'
      });
   }
});

/**
 @desc       Get all Categories
 @route      GET: {{URL}}/api/v1/category/parent
 @access     Private Admin
 */
exports.getAllSubCategory = asyncHandler(async (req, res, next) => {
   // const categoryName = req.params;
   // const query = req.query;
   // const [priceLower, priceUpper] = req.query.price.split(',');
   // console.log(priceLower);
   // console.log(priceUpper);
   const r = await CategoryRepo.getAllSubCategories();
   res.json({ success: true, subcat: r });
});

/**
 @desc       Create new Categories
 @route      POST: {{URL}}/api/v1/category/parent
 @access     Private Admin
 */
exports.createSubCategory = asyncHandler(async (req, res, next) => {
   const { parentId } = req.params;
   console.log(parentId);
   const { newSubCat } = req.body;
   try {
      const r = await CategoryRepo.createSubCategories(newSubCat, parentId);
      res.json({ success: true, subcat: r });
   } catch (err) {
      const r = await CategoryRepo.getAllSubCategories();
      return res.json({
         success: true,
         cat: r,
         error: 'Sub Categories Already Exists'
      });
   }
});
