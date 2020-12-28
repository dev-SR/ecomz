const bcrypt = require('bcrypt');
module.exports.encrypt = async pass => {
   const salt = await bcrypt.genSalt(12);
   const hashed = await bcrypt.hash(pass, salt);
   return hashed;
};
module.exports.decrypt = async (pass, hashed) => {
   const isValid = await bcrypt.compare(pass, hashed);
   return isValid;
};
