//Middleware/error.js
const errorHandler = (err, req, res, next) => {
   //Log to console for dev.
   process.env.NODE_ENV !== 'production' ? console.log(err.stack.red) : null;
   res.status(err.statusCode || 500).json({
      success: false,
      error: err.message || `Server Error`
   });
};

module.exports = errorHandler;
