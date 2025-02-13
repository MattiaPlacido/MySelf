//Importing express
const express = require("express");
//Creating an instance of express router
const userDataRouter = express.Router();
//Importing dotenv ambient variables
require("dotenv").config();

//USER DATA HANDLING
//Importing bcrypt for password hashing
const bcrypt = require("bcrypt");
//Importing database connection
const connection = require("../db_connection");

//Retrieve emails
//Route: GET /user/emails
userDataRouter.get("/emails", (req, res) => {
  console.log("Request");
  //Query to get all emails
  const sql = "SELECT email FROM users";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
    console.log("Emails sent successfully!");
  });
});

//Get user id from email
//Route: POST /user/emailToId
userDataRouter.post("/emailToId", (req, res) => {
  const { email } = req.body;

  //Checking if email is missing
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  //Query to get user id from email
  const sql = "SELECT id FROM users WHERE email = ?";

  connection.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Email not found" });
    }

    res.json(results);
    console.log("Id sent successfully: ", results);
  });
});

//User registration
//Route: POST /user/register
userDataRouter.post("/register", async (req, res) => {
  const { email, name, surname, password } = req.body;

  //NAME AND SURNAME VALIDATIOn
  if (
    !name ||
    name.length < 3 ||
    name.length > 40 ||
    !surname ||
    surname.length < 3 ||
    surname.length > 40
  ) {
    return res.status(400).json({ error: "Name or surname are invalid" });
  }

  //EMAIL VALIDATION
  //Checking that email is present and in a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    //Check if email is already registered
    const checkEmailSql = "SELECT * FROM users WHERE email = ?";
    const [results] = await connection.promise().query(checkEmailSql, [email]);

    if (results.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    //PASSWORD VALIDATION
    //Check that password is present and strong enough
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=])[A-Za-z0-9!@#$%^&*()_\-+=]{8,32}$/;
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password needs to be between 8 and 32 characters, and include at least 1 number and 1 special character (e.g., @, _)",
      });
    }

    //Hashing the password
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS_NUMBER)
    );

    //Query to insert user in database
    const sql =
      "INSERT INTO users (email, name, surname, password) VALUES (?, ?, ?, ?)";
    connection.query(
      sql,
      [email, name, surname, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "User registered successfully!" });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Importing JWT to send authentication token
const jwt = require("jsonwebtoken");

//User login
//Route: POST /user/login
userDataRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //Check if email or password are missing
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  //Check that email is already registered
  try {
    const sql = "SELECT * FROM users WHERE email = ?";
    connection.query(sql, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = results[0];

      //Comparing hashed passwords
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      //Generating JWT token for authentication
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { algorithm: "HS256", expiresIn: "1h" }
      );
      console.log("Login successfull.");
      //Sending login confirmation and authentication Token
      res.json({ message: "Login successful", token });
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = userDataRouter;
