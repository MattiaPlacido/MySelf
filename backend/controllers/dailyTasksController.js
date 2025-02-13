//Importing database connection
const connection = require("../db_connection");

//Daily tasks CRUD

//Get all daily tasks by user id
//Route: GET /daily/tasks/:user_id
function index(req, res) {
  const { user_id } = req.params;

  //Checking if tasks belongs to the current user
  if (req.user_id !== parseInt(user_id)) {
    return res
      .status(403)
      .json({ error: "You are not authorized to view these tasks" });
  }

  //User id validation
  if (!user_id || isNaN(user_id) || user_id < 1) {
    return res.status(400).json({ error: "Invalid user_id" });
  }

  //Query to select tasks by user_id
  const sql = "SELECT * FROM daily_tasks WHERE user_id = ?";

  connection.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "No tasks found" });
    res.json(results);
  });
}

//Get a specific daily task by task id
//Route: GET /daily/task/:task_id
function show(req, res) {
  const { task_id } = req.params;

  //Task id validation
  if (!task_id || isNaN(task_id) || task_id < 1) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  //Query to get task by its id
  const sql = "SELECT * FROM daily_tasks WHERE id = ?";
  connection.query(sql, [task_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Task not found" });

    //Checking if task belongs to the current user
    if (req.user_id !== parseInt(results[0].user_id)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to view these tasks" });
    }

    res.json(results[0]);
  });
}

//Create a new daily task
//Route: POST /daily/addtask
function store(req, res) {
  let { title, content = null, user_id, time = null } = req.body;

  //User id validation
  if (!user_id || isNaN(user_id) || user_id < 1) {
    return res.status(400).json({ error: "Invalid user_id" });
  }

  //Check if user id exists
  const checkUserSql = "SELECT * FROM users WHERE id = ?";
  connection.query(checkUserSql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
  });

  //Check if task belongs to current user
  if (req.user_id !== parseInt(user_id)) {
    return res
      .status(403)
      .json({ error: "You are not authorized to add tasks for this user" });
  }

  //Title validation
  if (!title) {
    return res.status(400).json({ error: "Missing title" });
  }

  //Time validation if provided
  if (time) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({ error: "Invalid time format. Use HH:MM" });
    }
  }

  //Query to create a new task
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

//Update an existing daily task by task id
//Route: PUT /daily/updatetask/:task_id
function update(req, res) {
  const { task_id } = req.params;
  const { title, content, time } = req.body;

  //User id validation
  if (!task_id || isNaN(task_id) || task_id < 1) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  //time validation if provided
  if (time) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({ error: "Invalid time format. Use HH:MM" });
    }
  }

  //Get existing task data to fill missing data
  const getTaskSql = "SELECT * FROM daily_tasks WHERE id = ?";

  connection.query(getTaskSql, [task_id], (getErr, getResults) => {
    if (getErr) return res.status(500).json({ error: "Database query failed" });
    if (getResults.length === 0)
      return res.status(404).json({ error: "Task not found" });

    const existingData = getResults[0];

    //Check if task belongs to the current user
    if (req.user_id !== parseInt(existingData.user_id)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this task" });
    }

    //Final values for task update (keep existing values if not provided)
    const finalTitle = title || existingData.title;
    const finalContent = content || existingData.content;
    const finalTime = time || existingData.time;

    //Query to update the task with given values
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

//Delete a daily task by task id
//Route: DELETE /daily/tasks/:task_id
function destroy(req, res) {
  const { task_id } = req.params;

  //Task id validation
  if (!task_id || isNaN(task_id) || task_id < 1) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  //Check to ensure task exists
  const getTaskSql = "SELECT * FROM daily_tasks WHERE id = ?";
  connection.query(getTaskSql, [task_id], (getErr, getResults) => {
    if (getErr) return res.status(500).json({ error: "Database query failed" });
    if (getResults.length === 0)
      return res.status(404).json({ error: "Task not found" });

    if (req.user_id !== parseInt(getResults[0].user_id)) {
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
