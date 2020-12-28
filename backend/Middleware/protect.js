//Middleware/protect.js
//async handler
const asyncHandler = require('express-async-handler');
//JWT
const { verifyJWT } = require('../Utils/JWT');
// Importing User Model
const UsersModel = require('../Model/Users');
// Import Error Class
const ErrorResponse = require('../Utils/ErrorResponse');
//* Protect Route
exports.protect = asyncHandler(async (req, res, next) => {
   let token;
   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
   ) {
      token = req.headers.authorization.split(' ')[1];
   }
   //    else if ( req.cookies.token ) {
   //        token=req.cookies.token
   //     }

   // console.log(token);
   if (!token) {
      return next(new ErrorResponse('Not authorized, token failed', 401));
   }

   try {
      const decoded = verifyJWT(token, process.env.JWT_SECRET);
      //    req.user = await UsersModel.findByID( decoded.userID )
      req.userID = decoded.userID;
      next();
   } catch (err) {
      return next(new ErrorResponse('Not authorized, token failed', 401));
   }
});
