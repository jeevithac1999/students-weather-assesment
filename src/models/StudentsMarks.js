const Sequelize = require("sequelize");
const ClassDB = require("../config/classDB");
const Student = require("./StudentsInfo");

const StudentMarks = ClassDB.define("marks", {
  row_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subjects: {
    type: Sequelize.ENUM,
    values: ["subject1", "subject2", "subject3", "subject4", "subject5"],
    allowNull: false
  },
  marks: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
StudentMarks.belongsTo(Student, { foreignKey: "id" });
// const newStudentMarks = [
//   {
//     id: 1,
//     subjects: "subject1",
//     marks: 99
//   },
//   {
//     id: 1,
//     subjects: "subject2",
//     marks: 60
//   },
//   {
//     id: 1,
//     subjects: "subject3",
//     marks: 98
//   },
//   {
//     id: 1,
//     subjects: "subject4",
//     marks: 64
//   },
//   {
//     id: 1,
//     subjects: "subject5",
//     marks: 25
//   },
//   {
//     id: 2,
//     subjects: "subject1",
//     marks: 90
//   },
//   {
//     id: 2,
//     subjects: "subject2",
//     marks: 92
//   },
//   {
//     id: 2,
//     subjects: "subject3",
//     marks: 91
//   },
//   {
//     id: 2,
//     subjects: "subject4",
//     marks: 66
//   },
//   {
//     id: 2,
//     subjects: "subject5",
//     marks: 33
//   },
//   {
//     id: 3,
//     subjects: "subject1",
//     marks: 89
//   },
//   {
//     id: 3,
//     subjects: "subject2",
//     marks: 88
//   },
//   {
//     id: 3,
//     subjects: "subject3",
//     marks: 87
//   },
//   {
//     id: 3,
//     subjects: "subject4",
//     marks: 82
//   },
//   {
//     id: 3,
//     subjects: "subject5",
//     marks: 77
//   },
//   {
//     id: 4,
//     subjects: "subject1",
//     marks: 86
//   },
//   {
//     id: 4,
//     subjects: "subject2",
//     marks: 85
//   },
//   {
//     id: 4,
//     subjects: "subject3",
//     marks: 93
//   },
//   {
//     id: 4,
//     subjects: "subject4",
//     marks: 84
//   },
//   {
//     id: 4,
//     subjects: "subject5",
//     marks: 92
//   }
// ];

// StudentMarks.sync({ force: true })
//   .then(() => {
//     return StudentMarks.bulkCreate(newStudentMarks, { returning: true });
//   })
//   .then(result => {
//     console.log(result.forEach(item => console.log(item.get())));
//   })
//   .catch(console.error);
module.exports = StudentMarks;
