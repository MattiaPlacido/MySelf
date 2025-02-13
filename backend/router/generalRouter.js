//Importing express
const express = require("express");
//Creating an instance of express router
const generalRouter = express.Router();
//Importing token authorization middleware
const { tokenAuthorization } = require("../middlewares/tokenAuthorization");

//TASKS CRUD ROUTES
//Importing Tasks controller object to use its functions
const tasksController = require("../controllers/tasksController");

//Get all tasks by user id
generalRouter.get("/tasks/:user_id", tokenAuthorization, tasksController.index);

//Get a specific task by task id
generalRouter.get("/task/:task_id", tokenAuthorization, tasksController.show);

//Create a new task
generalRouter.post("/addtask", tokenAuthorization, tasksController.store);

//Update an existing task by task id
generalRouter.put(
  "/updatetask/:task_id",
  tokenAuthorization,
  tasksController.update
);

//Delete a task by task id
generalRouter.delete(
  "/tasks/:task_id",
  tokenAuthorization,
  tasksController.destroy
);

//DAILY TASKS CRUD
//Importing Daily Tasks controller object to use its functions
const dailyTasksController = require("../controllers/dailyTasksController");

//Get all daily tasks by user id
generalRouter.get(
  "/daily/tasks/:user_id",
  tokenAuthorization,
  dailyTasksController.index
);

//Get a specific daily task by task id
generalRouter.get(
  "/daily/task/:task_id",
  tokenAuthorization,
  dailyTasksController.show
);

//Create a new daily task
generalRouter.post(
  "/daily/addtask",
  tokenAuthorization,
  dailyTasksController.store
);

//Update an existing daily task by task id
generalRouter.put(
  "/daily/updatetask/:task_id",
  tokenAuthorization,
  dailyTasksController.update
);

//Delete a daily task by task id
generalRouter.delete(
  "/daily/tasks/:task_id",
  tokenAuthorization,
  dailyTasksController.destroy
);

module.exports = generalRouter;
