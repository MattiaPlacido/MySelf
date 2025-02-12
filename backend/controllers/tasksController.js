const connection = require("../db_connection");

// Tasks CRUD
// index
// host/general/tasks/:user_id
function index(req, res) {
  const { user_id } = req.params;

  if (!user_id || isNaN(user_id) || user_id < 1) {
    return res.status(400).json({ error: "Invalid user_id" });
  }

  if (req.user_id !== parseInt(user_id)) {
    return res
      .status(403)
      .json({ error: "You are not authorized to view these tasks" });
  }

  const sql = "SELECT * FROM tasks WHERE user_id = ?";

  connection.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "No tasks found" });
    res.json(results);
  });
}

//show
function show(req, res) {
  const { task_id } = req.params;

  if (!task_id || isNaN(task_id) || task_id < 1) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  const sql = "SELECT * FROM tasks WHERE id = ?";
  connection.query(sql, [task_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Task not found" });

    if (req.user_id !== parseInt(results[0].user_id)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to view these tasks" });
    }

    res.json(results[0]);
  });
}

//store
function store(req, res) {
  let { content = null, title, date = null, user_id } = req.body;

  console.log(req.body);

  if (!user_id || isNaN(user_id) || user_id < 1) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  if (!title) {
    return res.status(400).json({ error: "Missing title" });
  }

  if (req.user_id !== parseInt(user_id)) {
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
    [content, title, date, user_id, false],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      res.json(results);
    }
  );
}

function update(req, res) {
  const { task_id } = req.params;
  const { content, title, date, completed } = req.body;

  if (date) {
    const dateObject = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(dateObject.getTime()) || dateObject < today) {
      return res.status(400).json({ error: "Date is invalid" });
    }
  }

  if (completed !== undefined && completed !== true && completed !== false) {
    return res.status(400).json({ error: "Completed should be a boolean" });
  }

  if (!task_id || isNaN(task_id) || task_id < 1) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  const getTaskSql = "SELECT * FROM tasks WHERE id = ?";
  connection.query(getTaskSql, [task_id], (getErr, getResults) => {
    if (getErr) {
      return res
        .status(500)
        .json({ error: "Failed to fetch existing task data" });
    }

    if (getResults.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const existingData = getResults[0];

    if (req.user_id !== parseInt(existingData.user_id)) {
      return res.status(403).json({
        error: "You are not authorized to update tasks for this user",
      });
    }

    const finalContent = content !== undefined ? content : existingData.content;
    const finalTitle = title !== undefined ? title : existingData.title;
    const finalDate = date !== undefined ? date : existingData.date;
    const finalCompleted =
      completed !== undefined ? completed : existingData.completed;

    const updateSql =
      "UPDATE tasks SET content = ?, title = ?, date = ?, completed = ? WHERE id = ?";
    connection.query(
      updateSql,
      [finalContent, finalTitle, finalDate, finalCompleted, task_id],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
      }
    );
  });
}

//delete
function destroy(req, res) {
  const { task_id } = req.params;

  const getTaskSql = "SELECT * FROM tasks WHERE id = ?";
  connection.query(getTaskSql, [task_id], (getErr, getResults) => {
    if (!task_id || isNaN(task_id) || task_id < 1) {
      return res.status(400).json({ error: "Invalid task id" });
    }

    if (getErr) {
      return res
        .status(500)
        .json({ error: "Failed to fetch existing task data" });
    }

    if (getResults.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (req.user_id !== parseInt(getResults[0].user_id)) {
      return res.status(403).json({
        error: "You are not authorized to delete tasks for this user",
      });
    }

    const sql = "DELETE FROM tasks WHERE id = ?";
    connection.query(sql, [task_id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      res.json(results);
    });
  });
}

module.exports = { index, show, store, update, destroy };
