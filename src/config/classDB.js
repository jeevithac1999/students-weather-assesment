const sequelize = require("sequelize");
const ClassDB = new sequelize(process.env.DB_URL);
ClassDB.authenticate()
  .then(() => {
    console.log("Connection successful:)");
  })
  .catch(err => {
    console.log("Connection failed:(");
    console.error(err);
  });
module.exports = ClassDB;
