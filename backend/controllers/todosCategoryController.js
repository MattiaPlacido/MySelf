//* WIP / SCRAPPED

const connection = require("../db_connection");

function store(req, res) {
  const { name } = req.body;

  const sql = "INSERT INTO todo_categories (name) VALUES (?)";
  if (!name) {
    return res.status(400).json({ error: "Missing essential parameters" });
  }

  connection.query(sql, [name], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
    console.log("Todo category added successfully!");
  });
}

module.exports = { store };
