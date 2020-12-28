//Model/users.js
const db = require('../db');
const { encrypt } = require('../Utils/bcrypt');
class UserRepo {
   //crete Instance of a user
   static async newUser(user) {
      let newUser = new UserRepo();
      newUser.firstname = user.firstname;
      newUser.lastname = user.lastname;
      newUser.email = user.email;
      newUser.password = await encrypt(user.password);
      return newUser;
   }
   static User(user) {
      let newUser = new UserRepo();
      newUser.password = user.password;
      newUser.email = user.email;
      return newUser;
   }
   //create new user
   static async insertUser(user) {
      const {
         rows
      } = await db.query(`SELECT * from create_new_user($1,$2,$3,$4);`, [
         user.firstname,
         user.lastname,
         user.email,
         user.password
      ]);
      console.log(rows);
      return rows;
   }

   //find user
   static async findByEmail(email) {
      const { rows } = await db.query('SELECT * FROM get_user_info($1);', [
         email
      ]);
      return rows;
   }
   //find user
   static async findById(id) {
      console.log(id);
      const { rows } = await db.query(
         'SELECT * from get_user_info($1,$2,$3);',
         ['', id, 'by_id']
      );
      return rows;
   }
}

module.exports = UserRepo;
