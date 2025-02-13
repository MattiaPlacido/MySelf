//MySql package import
const mysql = require("mysql2");
//dotenv ambient variables import
require("dotenv").config();

//Connection object initialization
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//Attempt at connection to database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

//Connection export
module.exports = connection;
