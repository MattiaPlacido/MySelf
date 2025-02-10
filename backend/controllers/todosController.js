const connection = require("../db_connection");

//TO-DOS
//index
function index(req, res) {
  const { id } = req.params;
  const sql =
    "SELECT todos.* FROM todos JOIN users ON todos.user_id = users.id WHERE users.id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

//show

//store
function store(req, res) {
  let { content, title, date, userId, categoryId } = req.body;

  if (!title || !userId) {
    const err = new Error("Missing essential parameters");
    err.code = 400;
    throw err;
  }

  if (!content) {
    content = null;
  }
  if (!date) {
    date = null;
  }
  if (!categoryId) {
    categoryId = 1;
  }

  const status = false;

  const sql =
    "INSERT INTO todos (content, title, date, user_id, category_id, completed)VALUES ( ?, ?, ?, ?, ?, ?)";

  connection.query(
    sql,
    [content, title, date, userId, categoryId, status],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      res.json(results);
      console.log("Todo added successfully!");
    }
  );
}

//update

//delete

module.exports = { index, store };
