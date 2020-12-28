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
   res.json(r);
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
   const found = await CategoryRepo.findCategories(newCat);
   if (found) return next(new ErrorResponse('Categories Already Exists', 401));
   try {
      const r = await CategoryRepo.createCategories(newCat);
      res.json(r);
   } catch (err) {
      return next(new ErrorResponse('Db error', 401));
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
   res.json(r);
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
   const found = await CategoryRepo.findSubCategories(newSubCat, parentId);
   if (found)
      return next(new ErrorResponse('Sub Categories Already Exists', 401));
   try {
      const r = await CategoryRepo.createSubCategories(newSubCat, parentId);
      res.json(r);
   } catch (err) {
      console.log(err.message);
      return next(new ErrorResponse('Db error', 401));
   }
});
