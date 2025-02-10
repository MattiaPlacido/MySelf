//ROUTER INIT
const express = require("express");
const userDataRouter = express.Router();
require("dotenv").config();

//USER DATA HANDLING
const bcrypt = require("bcrypt");
const connection = require("../db_connection");

//EMAIL INDEX
userDataRouter.get("/emails", (req, res) => {
  const sql = "SELECT email FROM users";
  connection.query(sql, (err, results) => {
    res.json(results);
    console.log("Emails sent successfully!");
  });
});

//GET ID BASED ON EMAIL
userDataRouter.post("/emailToId", (req, res) => {
  console.log("EmailToId request ");
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

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

//REGISTER
userDataRouter.post("/register", async (req, res) => {
  const { email, name, surname, password } = req.body;
  console.log(email, name, surname, password);

  if (!email || !name || !surname || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS_NUMBER)
    );
    console.log(hashedPassword);
    console.log("Password hashed successfully!");

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

//LOGIN
const jwt = require("jsonwebtoken");

userDataRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  //MAKING SURE EMAILS EXISTS
  try {
    const sql = "SELECT * FROM users WHERE email = ?";
    connection.query(sql, [email], async (err, results) => {
      //QUERY ERROR
      if (err) return res.status(500).json({ error: "Database error" });
      //QUERY EMPTY
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = results[0];

      //COMPARING HASHED PASSWORDS
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      //TOKEN GENERATION
      const token = jwt.sign(
        { id: user.id, email: user.email },
        Buffer.from(process.env.JWT_SECRET_KEY, "base64"),
        { algorithm: "HS256", expiresIn: "1h" }
      );
      console.log("Login successfull.");
      res.json({ message: "Login successful", token });
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = userDataRouter;
