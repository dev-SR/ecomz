//Middleware/protect.js
//async handler
const asyncHandler = require('express-async-handler');
//JWT
// Importing User Model
const UsersModel = require('../Model/Users');
// Import Error Class
const ErrorResponse = require('../Utils/ErrorResponse');
//* Protect Route
exports.admin = asyncHandler(async (req, res, next) => {
   const id = req.userID;
   let [u] = await UsersModel.findById(id);
   const { role } = u;
   if (!role || role === 'user') {
      return next(
         new ErrorResponse('Not authorized, you must be an admin', 401)
      );
   } else next();
});
