const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const path = require("path");
const db = require("./config/classDB");
const { QueryTypes } = require("sequelize");
const studentsInfo = require("./models/StudentsInfo");
const ifEquality = require("./views/helpers/ifEquality");
const dateFormatter=require("./views/helpers/dateFormat")

const DarkSky = require("dark-sky");
const darksky = new DarkSky(process.env.DARK_SKY);

const app = express();
const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    ifEquality,
    dateFormatter
  }
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", {
    layout: "hero",
    pageTitle: "Home"
  });
});
//students
app.get("/web/students", async (req, res) => {
  var students = [];
  await studentsInfo.findAll().then(response => {
    response.forEach(student => students.push(student.get()));
  });
  res.render("students", {
    layout: "navigation",
    pageTitle: "Students Details",
    students
  });
});
//marksheets
app.get("/web/marksheet", async (req, res) => {
  var avgScores;
  await db
    .query(
      "select subjects,round(avg(marks),2) as average from marks group by subjects order by subjects",
      { type: QueryTypes.SELECT }
    )
    .then(res => {
      avgScores = res;
    });
  var overall_toper;
  await db
    .query(
      "select first_name as name, m.total from studentsinfos s join (select id, sum(marks) as total from marks group by 1 order by 2 desc) m on s.id=m.id",
      { type: QueryTypes.SELECT }
    )
    .then(res => {
      overall_toper = res;
    });
  var each_subject_topper;
  await db
    .query(
      "select first_name as names, m.subjects, m.marks from marks m join (select subjects, max(marks) as mark from marks group by subjects) ms on m.subjects=ms.subjects and m.marks=ms.mark join studentsinfos s on m.id=s.id",
      { type: QueryTypes.SELECT }
    )
    .then(res => {
      each_subject_topper = res;
    });
  var less_than35;
  await db
    .query(
      "select subjects,count(*) as count from marks where marks<35 group by subjects",
      {
        type: QueryTypes.SELECT
      }
    )
    .then(res => {
      less_than35 = res;
    });

  var MarkSheet;
  await db
    .query(
      "select first_name as names, array_agg(distinct m.subjects) as subjects, array_agg(distinct m.marks) as marks from studentsinfos s join marks m on s.id=m.id group by 1",
      {
        type: QueryTypes.SELECT
      }
    )
    .then(response => {
      MarkSheet = response;
    });
  res.render("studentsMarks", {
    layout: "navigation",
    pageTitle: "Marksheet",
    avgScores,
    overall_toper,
    each_subject_topper,
    less_than35,
    MarkSheet
  });
});

//weather

app.get("/web/weather", async (req, res) => {
  var weatherReport;
  await darksky
    .coordinates({ lat: 13.0827, lng: 80.2707 })
    .exclude("minutes,hourly,alerts,flags")
    .get()
    .then(response => {
      weatherReport = response.daily.data;
    });

  res.render("weather", {
    layout: "hero",
    weatherReport
  });
});

const server = app.listen(8080, (request, response) => {
  console.log(`Server running on port ${server.address.port}.`);
});
