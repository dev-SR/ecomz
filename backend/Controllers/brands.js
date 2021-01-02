//Controller/Brands.js
const _ = require('lodash');
// Importing User Model
const BrandsRepo = require('../Model/Brands');
// Import Error Class
const ErrorResponse = require('../Utils/ErrorResponse');
//async handler
const asyncHandler = require('express-async-handler');

/**
 @desc       Get all Brands
 @route      GET: {{URL}}/api/v1/brands
 @access     Private Admin
 */
exports.getAllBrands = asyncHandler(async (req, res, next) => {
   const r = await BrandsRepo.getAllBrands();
   res.json({ success: true, brands: r });
});

/**
 @desc       Create new Brands
 @route      POST: {{URL}}/api/v1/brands
 @access     Private Admin
 */
exports.createBrands = asyncHandler(async (req, res, next) => {
   const { newBrands } = req.body;
   try {
      const r = await BrandsRepo.createBrands(newBrands);
      res.json({ success: true, brands: r });
   } catch (err) {
      return next(new ErrorResponse('Brands Already Exits', 500));
   }
});

/**
 @desc       Update Brands
 @route      PUT: {{URL}}/api/v1/brands/:id
 @access     Private Admin
 */
exports.updateBrands = asyncHandler(async (req, res, next) => {
   const { id } = req.params;
   const { editBrands } = req.body;
   try {
      const r = await BrandsRepo.updateBrands(id, editBrands);
      res.json({ updated: true, brands: r });
   } catch (err) {
      return res.json({
         success: false,
         updateError: `Brands ${editCat} May Already Exit`
      });
   }
});

/**
 @desc       Delete Brands
 @route      DELETE: {{URL}}/api/v1/brands/:id
 @access     Private Admin
 */
exports.deleteBrands = asyncHandler(async (req, res, next) => {
   const { id } = req.params;
   console.log(id);
   try {
      const r = await BrandsRepo.deleteBrands(id);
      res.json({ deleted: true, brands: r });
   } catch (err) {
      return res.json({
         success: true,
         deleteError: 'Delete Failed'
      });
   }
});
