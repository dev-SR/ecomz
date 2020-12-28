const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports.generateJWT = id => {
   const payload = {
      userID: id
   };
   return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d'
   });
};
module.exports.verifyJWT = token => {
   return jwt.verify(token, process.env.JWT_SECRET);
};
