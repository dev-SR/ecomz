//Controller/Products.js
const _ = require('lodash');
// Importing User Model
const ReviewsRepo = require('../Model/Review');
// Import Error Class
const ErrorResponse = require('../Utils/ErrorResponse');
//async handler
const asyncHandler = require('express-async-handler');

/**
 @desc       Get all Products
 @route      GET: {{URL}}/api/v1/Products   ?page=$&limit=$
 @access     Private Admin
 */
exports.getRating = asyncHandler(async (req, res, next) => {
   const { id } = req.params;
   const [r] = await ReviewsRepo.getRating(id);
   res.json(r);
});
