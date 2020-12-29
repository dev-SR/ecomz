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
   const { newCat, image } = req.body;
   // if (found) return next(new ErrorResponse('Categories Already Exists', 401));
   try {
      const r = await CategoryRepo.createCategories(newCat, image);
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
 @desc       Update Categories
 @route      PUT: {{URL}}/api/v1/category/parent/:id
 @access     Private Admin
 */
exports.updateCategory = asyncHandler(async (req, res, next) => {
   const { id } = req.params;
   const { editCat, editImage } = req.body;
   // console.log(id + editCat + editImage);
   try {
      const r = await CategoryRepo.updateCategories(id, editCat, editImage);
      res.json({ updated: true, cat: r });
   } catch (err) {
      const r = await CategoryRepo.getAllCategories();
      return res.json({
         success: false,
         updateError: 'Update Failed , Category May Already Exits'
      });
   }
});

/**
 @desc       Update Categories
 @route      PUT: {{URL}}/api/v1/category/parent
 @access     Private Admin
 */
exports.deleteCategory = asyncHandler(async (req, res, next) => {
   // const deleteId = req.body;
   const { id } = req.params;

   // console.log(deleteId);
   // console.log(id);

   try {
      const r = await CategoryRepo.deleteCategory(id);
      res.json({ deleted: true, cat: r });
   } catch (err) {
      const r = await CategoryRepo.getAllCategories();
      return res.json({
         success: true,
         cat: r,
         deleteError: 'Delete Failed'
      });
   }
});

/**
 @desc       Get all Sub Categories
 @route      GET: {{URL}}/api/v1/category/parent
 @access     Private Admin
 */
exports.getAllSubCategory = asyncHandler(async (req, res, next) => {
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
