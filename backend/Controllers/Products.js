//Controller/Products.js
const _ = require('lodash');
// Importing User Model
const ProductsRepo = require('../Model/Products');
// Import Error Class
const ErrorResponse = require('../Utils/ErrorResponse');
//async handler
const asyncHandler = require('express-async-handler');

/**
 @desc       Get all Products
 @route      GET: {{URL}}/api/v1/Products   ?page=$&limit=$
 @access     Private Admin
 */
exports.getAllProducts = asyncHandler(async (req, res, next) => {
   const { page, limit } = req.query;
   const r = await ProductsRepo.getAllProducts(page, limit);
   res.json({ success: true, products: r });
});

/**
 @desc       Create new Products
 @route      POST: {{URL}}/api/v1/Products
 @access     Private Admin
 */
exports.createProducts = asyncHandler(async (req, res, next) => {
   const p = req.body;
   console.log(p);
   try {
      const r = await ProductsRepo.createProducts(p);
      res.json({ created: true, id: r });
   } catch (err) {
      return next(new ErrorResponse('Brands Already Exits', 500));
   }
});

/**
 @desc       Update Products
 @route      PUT: {{URL}}/api/v1/Products/:id
 @access     Private Admin
 */
exports.updateProducts = asyncHandler(async (req, res, next) => {
   const { id } = req.params;
   const { editBrands } = req.body;
   try {
      const r = await ProductsRepo.updateProducts(id, editBrands);

      if (!r.length)
         return next(
            new ErrorResponse(`Brands ${editBrands} May Already Exit`, 500)
         );

      res.json({ updated: true });
   } catch (err) {
      return res.json({
         success: false,
         updateError: `Brands ${editBrands} May Already Exit`
      });
   }
});

/**
 @desc       Delete Products
 @route      DELETE: {{URL}}/api/v1/Products/:id
 @access     Private Admin
 */
exports.deleteProducts = asyncHandler(async (req, res, next) => {
   const { id } = req.params;
   console.log(id);
   try {
      const r = await ProductsRepo.deleteProducts(id);
      if (!r.length)
         return next(new ErrorResponse(`${editBrands} cant be deleted`, 500));
      res.json({ deleted: true });
   } catch (err) {
      return res.json({
         success: true,
         deleteError: 'Delete Failed'
      });
   }
});
