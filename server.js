const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(cors());

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// mysql db connection
let con = mysql.createConnection({
  host: "35.188.215.164",
  user: "root",
  password: "Bhavani@123",
  database: "studentsdata",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to mySQL database..!!");
});

// api routes
app.get("/api/students", async (req, res) => {
  await con.query("SELECT * FROM students", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});
let insertedId = 0;
app.get("/api/students/add", async (req, res) => {
  const { firstName, lastName, mailingAddress, gpa, email } = req.query;
  let sql = `INSERT INTO students(FirstName, LastName, MailingAddress, GPA, Email) VALUES ('${firstName}', '${lastName}', '${mailingAddress}',${gpa},'${email}')`;
  await con.query(sql, function (err, result) {
    if (err) {
      return res.send(err);
    } else {
      insertedId = result.insertId;
      return res.send("Successfully Added 1 record " + insertedId);
    }
  });
});

app.get("/api/students/id", async (req, res) => {
  await con.query("SELECT MAX(StudentID) AS max_id FROM students", function (
    err,
    result,
    fields
  ) {
    if (err) throw err;
    res.json(result[0].max_id);
  });
});

app.get("/api/students/search", async (req, res) => {
  const { studentID, firstName, lastName } = req.query;

  let query = "SELECT * FROM students WHERE ";
  if (studentID) query = query.concat(`StudentID=${studentID} AND `);
  else query = query.concat(`StudentID IS NOT NULL AND `);
  if (firstName) query = query.concat(`FirstName='${firstName}' AND `);
  else query = query.concat(`FirstName IS NOT NULL AND `);
  if (lastName) query = query.concat(`LastName='${lastName}'`);
  else query = query.concat(`LastName IS NOT NULL`);
  // console.log(query);

  await con.query(query, function (err, result) {
    if (err) {
      return res.send(err);
    } else {
      return res.send(result);
    }
  });
});

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);
