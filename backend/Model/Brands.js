//Model/users.js
const db = require('../db');
class BrandsRepo {
   //crete Instance of a user

   //Create New Brands
   static async getAllBrands() {
      const { rows } = await db.query('SELECT * FROM get_brands();');
      return rows;
   }
   //Create New Brands
   static async createBrands(newBrands) {
      const { rows } = await db.query('SELECT * FROM create_brands($1);', [
         newBrands
      ]);
      // console.log(rows);
      return rows;
   }

   //Update  Brands
   static async updateBrands(id, editBrands) {
      const { rows } = await db.query('SELECT * FROM update_brands($1,$2);', [
         id,
         editBrands
      ]);
      // console.log(rows);
      return rows;
   }

   //Delete  Brands
   static async deleteBrands(id) {
      const { rows } = await db.query('SELECT * FROM delete_brands($1);', [id]);
      // console.log(rows);
      return rows;
   }
}

module.exports = BrandsRepo;
