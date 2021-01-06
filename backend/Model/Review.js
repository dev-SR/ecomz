//Model/Reviews.js
const db = require('../db');
class ReviewsRepo {
   //Get Reviews
   static async getRating(pid) {
      const { rows } = await db.query('SELECT * FROM get_rating($1);', [pid]);
      return rows;
   }
}

module.exports = ReviewsRepo;
