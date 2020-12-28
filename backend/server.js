//server.js
const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');
const path = require('path');
const morgan = require('morgan');
const errorHandler = require('./Middleware/error');

require('dotenv').config();

//users routes
const authRoute = require('./Routes/auth');
const categoryRoute = require('./Routes/category');

//Middleware
app.use(cors());
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

//Mount Router
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);

//Must be after route to catch Errors.....
app.use(errorHandler);

const _dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(_dirname, '/frontend/build')));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html'));
   });
} else {
   app.get('/', (req, res) => {
      res.send('API is running');
   });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(
      `Listening on port http://localhost:${port} on ${process.env.NODE_ENV} mode`
         .yellow.bold
   );
});
