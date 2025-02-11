const connection = require("../db_connection");


// Tasks CRUD
// index
// host/general/tasks/:user_id
function index(req, res) {
  const { user_id } = req.params;

  if (req.user_id !== parseInt(user_id)) {
    return res
      .status(403)
      .json({ error: "You are not authorized to view these tasks" });
  }

  const sql =
    "SELECT tasks.* FROM tasks JOIN users ON tasks.user_id = users.id WHERE users.id = ?";

  connection.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "No tasks found" });
    res.json(results);
  });
}

//show

//store
function store(req, res) {
  let { content = null, title, date = null, userId } = req.body;

  if (!title || !userId) {
    return res
      .status(400)
      .json({ error: "Missing essential parameters (title, userId)" });
  }

  if (req.user_id !== parseInt(userId)) {
    return res
      .status(403)
      .json({ error: "You are not authorized to add tasks for this user" });
  }

  const sql =
    "INSERT INTO tasks (content, title, date, user_id, completed)VALUES ( ?, ?, ?, ?, ?)";

  connection.query(
    sql,
    [content, title, date, userId, false],
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
