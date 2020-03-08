const Sequelize = require("sequelize");
const ClassDB = require("../config/classDB");

const StudentInfo = ClassDB.define("studentsinfos", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstname: {
    type: Sequelize.STRING,
    field: "first_name",
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    field: "last_name",
    allowNull: false
  },
  age: Sequelize.INTEGER,
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
// const newStudent = [
//   {
//     firstname: "Jeevitha",
//     lastname: "Chamarthi",
//     age: 23,
//     gender: "female"
//   },
//   {
//     firstname: "Harish",
//     lastname: "Chamarthi",
//     age: 23,
//     gender: "male"
//   },
//   {
//     firstname: "Bhagyalakshmi",
//     lastname: "Chamarthi",
//     age: 24,
//     gender: "female"
//   },
//   {
//     firstname: "Venkatachalapathy",
//     lastname: "Chamarthi",
//     age: 24,
//     gender: "male"
//   }
// ];

// StudentInfo.sync({ force: true })
//   .then(() => {
//     return StudentInfo.bulkCreate(newStudent, { returning: true });
//   })
//   .then(result => {
//     console.log(result.forEach(item => console.log(item.get())));
//   })
//   .catch(console.error);
module.exports = StudentInfo;
