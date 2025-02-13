//Importing database connection
const connection = require("../db_connection");

// Tasks CRUD
//Get all tasks by user id
//Route: GET /general/tasks/:user_id
function index(req, res) {
  const { user_id } = req.params;

  //User id validation
  if (!user_id || isNaN(user_id) || user_id < 1) {
    return res.status(400).json({ error: "Invalid user_id" });
  }

  //Checking if tasks belongs to the current user
  if (req.user_id !== parseInt(user_id)) {
    return res
      .status(403)
      .json({ error: "You are not authorized to view these tasks" });
  }

  //Query to select tasks by user_id
  const sql = "SELECT * FROM tasks WHERE user_id = ?";

  connection.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "No tasks found" });
    res.json(results);
  });
}

//Get a specific task by task id
//Route: GET /general/task/:task_id
function show(req, res) {
  const { task_id } = req.params;

  //Task id validation
  if (!task_id || isNaN(task_id) || task_id < 1) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  //Query to get task by its id
  const sql = "SELECT * FROM tasks WHERE id = ?";
  connection.query(sql, [task_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Task not found" });

    //Checking if task belongs to the current user
    if (req.user_id !== parseInt(results[0].user_id)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to view this task" });
    }

    res.json(results[0]);
  });
}

//Create a new task
//Route: POST /general/addtask
function store(req, res) {
  let { content = null, title, date = null, user_id } = req.body;

  //User id validation
  if (!user_id || isNaN(user_id) || user_id < 1) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  //Title validation
  if (!title) {
    return res.status(400).json({ error: "Missing title" });
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

  //Date validation if provided
  if (date) {
    const dateObject = new Date(date);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(dateObject.getTime()) || dateObject < today) {
      return res.status(400).json({ error: "Date is invalid" });
    }
  }

  //Query to create a new task
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

//Update an existing task by task id
//Route: PUT /general/updatetask/:task_id
function update(req, res) {
  const { task_id } = req.params;
  const { content, title, date, completed } = req.body;

  //Date validation if provided
  if (date) {
    const dateObject = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(dateObject.getTime()) || dateObject < today) {
      return res.status(400).json({ error: "Date is invalid" });
    }
  }

  //Completed field validation
  if (completed !== undefined && completed !== true && completed !== false) {
    return res.status(400).json({ error: "Completed should be a boolean" });
  }

  //Task id validation
  if (!task_id || isNaN(task_id) || task_id < 1) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  //Get existing task data to fill missing data
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

    //Check if task belongs to the current user
    if (req.user_id !== parseInt(existingData.user_id)) {
      return res.status(403).json({
        error: "You are not authorized to update tasks for this user",
      });
    }
    //Final values for task update (keep existing values if not provided)
    const finalContent = content !== undefined ? content : existingData.content;
    const finalTitle = title !== undefined ? title : existingData.title;
    const finalDate = date !== undefined ? date : existingData.date;
    const finalCompleted =
      completed !== undefined ? completed : existingData.completed;

    //Query to update the task with given values
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

//Delete a task by task id
//Route: DELETE /general/tasks/:task_id
function destroy(req, res) {
  const { task_id } = req.params;

  //Task id validation
  if (!task_id || isNaN(task_id) || task_id < 1) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  //Check to ensure task exists
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

    //Check if task belongs to the current user
    if (req.user_id !== parseInt(getResults[0].user_id)) {
      return res.status(403).json({
        error: "You are not authorized to delete tasks for this user",
      });
    }

    //Query to delete said task
    const sql = "DELETE FROM tasks WHERE id = ?";
    connection.query(sql, [task_id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      res.json(results);
    });
  });
}

module.exports = { index, show, store, update, destroy };
