//Model/users.js
const db = require('../db');
class ProductsRepo {
   //crete Instance of a user

   //Get all Products
   static async getAllProducts(page, limit) {
      const { rows } = await db.query('SELECT * FROM get_products($1,$2);', [
         page,
         limit
      ]);
      return rows;
   }

   //Create New Products
   static async findProducts(newCat) {
      const { rows } = await db.query('SELECT * FROM findCategory($1);', [
         newCat
      ]);
      // console.log(rows[0].findcategory);
      return rows[0].findcategory;
   }

   //Create New Products
   static async createProducts(p) {
      const {
         u_id,
         p_name,
         descp,
         img,
         p_price,
         p_relase,
         catid,
         subcatid,
         brandid,
         p_color = 'Black and White',
         p_quantity = 1,
         p_discount = 0,
         p_sold = 0
      } = p;

      const {
         rows
      } = await db.query(
         'SELECT * FROM create_product($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);',
         [
            u_id,
            p_name,
            descp,
            img,
            p_price,
            p_relase,
            catid,
            subcatid,
            brandid,
            p_color,
            p_quantity,
            p_discount,
            p_sold
         ]
      );
      // console.log(rows);
      return rows;
   }

   //Update  Products
   static async updateProducts(id, editName, editImage) {
      const {
         rows
      } = await db.query('SELECT * FROM update_categories($1,$2,$3);', [
         id,
         editName,
         editImage
      ]);
      // console.log(rows);
      return rows;
   }

   //Delete  Categories
   static async deleteProducts(id) {
      const {
         rows
      } = await db.query('SELECT * FROM detete_from_Categories($1);', [id]);
      // console.log(rows);
      return rows;
   }
}

module.exports = ProductsRepo;
