const connection = require("../db_connection");

//Daily tasks CRUD
//index
function index(req, res) {
  const { user_id } = req.params;

  if (req.user_id !== parseInt(user_id)) {
    return res
      .status(403)
      .json({ error: "You are not authorized to view these tasks" });
  }

  if (!user_id || isNaN(user_id) || user_id < 1) {
    return res.status(400).json({ error: "Invalid user_id" });
  }

  const sql = "SELECT * FROM daily_tasks WHERE user_id = ?";

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

  const sql = "SELECT * FROM daily_tasks WHERE id = ?";
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
  let { title, content = null, user_id, time = null } = req.body;

  if (!user_id || isNaN(user_id) || user_id < 1) {
    return res.status(400).json({ error: "Invalid user_id" });
  }

  if (req.user_id !== parseInt(user_id)) {
    return res
      .status(403)
      .json({ error: "You are not authorized to add tasks for this user" });
  }

  if (!title || !user_id) {
    return res.status(400).json({ error: "Missing essential parameters" });
  }

  if (time) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({ error: "Invalid time format. Use HH:MM" });
    }
  }

  const sql =
    "INSERT INTO daily_tasks (title, content, user_id, time) VALUES (?, ?, ?, ?)";
  connection.query(sql, [title, content, user_id, time], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
}

//update
function update(req, res) {
  const { task_id } = req.params;
  const { title, content, time } = req.body;

  if (!task_id || isNaN(task_id) || task_id < 1) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  if (time) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({ error: "Invalid time format. Use HH:MM" });
    }
  }

  const getTaskSql = "SELECT * FROM daily_tasks WHERE id = ?";

  connection.query(getTaskSql, [task_id], (getErr, getResults) => {
    if (getErr) return res.status(500).json({ error: "Database query failed" });
    if (getResults.length === 0)
      return res.status(404).json({ error: "Task not found" });

    const existingData = getResults[0];

    if (req.user_id !== parseInt(existingData.user_id)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this task" });
    }

    const finalTitle = title || existingData.title;
    const finalContent = content || existingData.content;
    const finalTime = time || existingData.time;

    const sql =
      "UPDATE daily_tasks SET title = ?, content = ?, time = ? WHERE id = ?";
    connection.query(
      sql,
      [finalTitle, finalContent, finalTime, task_id],
      (err, results) => {
        if (err)
          return res.status(500).json({ error: "Database query failed" });
        res.json(results);
      }
    );
  });
}

//delete
function destroy(req, res) {
  const { task_id } = req.params;

  if (!task_id || isNaN(task_id) || task_id < 1) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  const getTaskSql = "SELECT * FROM daily_tasks WHERE id = ?";
  connection.query(getTaskSql, [task_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Task not found" });

    if (req.user_id !== parseInt(results[0].user_id)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this task" });
    }

    const sql = "DELETE FROM daily_tasks WHERE id = ?";
    connection.query(sql, [task_id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      res.json(results);
    });
  });
}

module.exports = { index, show, store, update, destroy };
