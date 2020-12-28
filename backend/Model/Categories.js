//Model/users.js
const db = require('../db');
class CategoryRepo {
   //crete Instance of a user

   //Create New Categories
   static async getAllCategories() {
      const { rows } = await db.query('SELECT * FROM get_categories();');
      return rows;
   }

   //Create New Categories
   static async findCategories(newCat) {
      const { rows } = await db.query('SELECT * FROM findCategory($1);', [
         newCat
      ]);
      // console.log(rows[0].findcategory);
      return rows[0].findcategory;
   }

   //Create New Categories
   static async createCategories(newCat) {
      const { rows } = await db.query('SELECT * FROM create_categories($1);', [
         newCat
      ]);
      // console.log(rows);
      return rows;
   }
   //Create New Categories
   static async getAllSubCategories() {
      const { rows } = await db.query('SELECT * FROM get_sub_categories();');
      return rows;
   }
   //Create New Categories
   static async findSubCategories(newCat, p_id) {
      const { rows } = await db.query('SELECT * FROM findSubCategory($1,$2);', [
         newCat,
         p_id
      ]);
      console.log(rows[0]);
      return rows[0].findsubcategory;
   }

   //Create New Categories
   static async createSubCategories(newCat, p_id) {
      const {
         rows
      } = await db.query(
         'SELECT * FROM create_sub_categories_with_parent_id($1,$2);',
         [p_id, newCat]
      );
      // console.log(rows);
      return rows;
   }
}

module.exports = CategoryRepo;
