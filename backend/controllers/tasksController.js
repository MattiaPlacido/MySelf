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

  if (date) {
    const dateObject = new Date(date);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(dateObject.getTime()) || dateObject < today) {
      return res.status(400).json({ error: "Date is invalid" });
    }
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
function update(req, res) {
  const { task_id } = req.params;

  //GET EXISTING TASK DATA
  const getTaskSql = "SELECT * FROM tasks WHERE id = ?";
  connection.query(getTaskSql, [task_id], (getErr, getResults) => {
    if (getErr)
      return res
        .status(500)
        .json({ error: "Failed to fetch existing property data" });
    if (getResults.length === 0)
      return res.status(404).json({ error: "Recensione non trovata" });

    if (date) {
      const dateObject = new Date(date);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(dateObject.getTime()) || dateObject < today) {
        return res.status(400).json({ error: "Date is invalid" });
      }
    }

    if (completed !== true && completed !== false) {
      return res.status(400).json({ error: "Completed should be a boolean" });
    }

    const existingData = getResults[0];
    const {
      content = existingData.content,
      title = existingData.title,
      date = existingData.date,
      completed = existingData.completed,
    } = req.body;

    const sql =
      "UPDATE tasks SET content = ?, title = ?, date = ?, completed = ? WHERE id = ?";
    connection.query(
      sql,
      [content, title, date, completed, task_id],
      (err, results) => {
        if (err)
          return res.status(500).json({ error: "Database query failed" });
        if (results.affectedRows === 0)
          return res.status(404).json({ error: "Task not found" });
        res.json(results);
        console.log("Task updated successfully!");
      }
    );
  });
}

//delete
function destroy(req, res) {
  const { task_id } = req.params;
  const sql = "DELETE FROM tasks WHERE id = ?";
  connection.query(sql, [task_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Task not found" });
    res.json(results);
    console.log("Task deleted successfully!");
  });
}

module.exports = { index, store, update, destroy };
