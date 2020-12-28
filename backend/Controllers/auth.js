//Controller/auth.js
const _ = require('lodash');
// Importing User Model
const UsersModel = require('../Model/Users');
// Import Error Class
const ErrorResponse = require('../Utils/ErrorResponse');
//async handler
const asyncHandler = require('express-async-handler');
//JWT
const { generateJWT } = require('../Utils/JWT');
const { decrypt } = require('../Utils/bcrypt');
const { check, validationResult } = require('express-validator');

//* INPUT Validation
exports.validate = method => {
   switch (method) {
      case 'register':
         return [
            check('firstname', 'Must be at least 3 chars long').isLength({
               min: 3
            }),
            check('lastname', 'Must be at least 3 chars long').isLength({
               min: 3
            }),
            check('email', 'Must be a valid email').isEmail(),
            // .custom(async email => {
            //    const data = await UsersModel.findByEmail(email);
            //    console.log(data);
            //    if (data.length) {
            //       throw new Error('Email already registered');
            //    }
            // }),
            check('password', 'Must be at least 6 chars long')
               .not()
               .isIn(['123', 'password', 'god'])
               .withMessage('Do not use a common word as the password')
               .isLength({
                  min: 6
               })
            // .matches(/\d/)
            // .withMessage('must contain a number')
         ];
      case 'login':
         return [
            check('email', 'Must be a valid email').isEmail(),
            check('password', 'Must be at least 6 chars long').isLength({
               min: 6
            })
         ];
   }
};
/**
   @desc       register new user
   @route      POST: /api/v1/auth/register
   @access     Public
 */

exports.register = asyncHandler(async (req, res, next) => {
   //check validation result
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      //return res.status(422).json({ errors: errors.array() });
      const e = [];
      errors.array().forEach(err => {
         let picked = _.pick(err, ['param', 'msg']);
         e.push(picked);
      });
      return res.status(422).json({ validation_error: e });
   }

   // Register new user
   const user = req.body;

   const found = await UsersModel.findByEmail(user.email);
   console.log(found);
   if (found.length)
      return next(new ErrorResponse(`Email already registered`, 404));

   //creat user instance with hashed password
   const userObj = await UsersModel.newUser(user);
   const [data] = await UsersModel.insertUser(userObj);

   //generate JWT
   const token = generateJWT(data.uid);

   res.status(200).json({ success: true, ...data, token });
});
/**
 @desc       Log in user
 @route      POST: /api/v1/auth/login
 @access     Public
 */
exports.login = asyncHandler(async (req, res, next) => {
   //check validation result
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      //return res.status(422).json({ errors: errors.array() });
      const e = [];
      errors.array().forEach(err => {
         let picked = _.pick(err, ['param', 'msg']);
         e.push(picked);
      });
      return res.status(422).json({ validation_error: e });
   }

   // request parameters
   const { email, password } = req.body;
   //find users
   // console.log(req.body);
   const [user] = await UsersModel.findByEmail(email);
   // console.log(user);

   // if fails
   if (!user)
      return next(
         new ErrorResponse(`Please Enter valid email or password`, 404)
      );

   //decrypt password
   const passMatched = await decrypt(password, user.password);
   // if didn't matched
   // console.log(passMatched);
   if (!passMatched)
      return next(
         new ErrorResponse(`Please Enter valid email or password`, 404)
      );
   //filter sensitive data
   const filteredData = _.pick(user, [
      'uid',
      'email',
      'firstname',
      'lastname',
      'role'
   ]);
   //generate JWT
   const token = generateJWT(user.uid);
   res.status(200).json({
      success: true,
      ...filteredData,
      token
   });
});
