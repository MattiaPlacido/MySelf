const express = require("express");
const generalRouter = express.Router();
const { tokenAuthorization } = require("../middlewares/tokenAuthorization");

//TASKS CRUD
const tasksController = require("../controllers/tasksController");

//index
generalRouter.get("/tasks/:user_id", tokenAuthorization, tasksController.index);
//show
generalRouter.get("/task/:task_id", tokenAuthorization, tasksController.show);
//store
generalRouter.post("/addtask", tokenAuthorization, tasksController.store);
//update
generalRouter.put(
  "/updatetask/:task_id",
  tokenAuthorization,
  tasksController.update
);
//delete
generalRouter.delete(
  "/tasks/:task_id",
  tokenAuthorization,
  tasksController.destroy
);

//DAILY TASKS CRUD
const dailyTasksController = require("../controllers/dailyTasksController");
//index
generalRouter.get(
  "/daily/tasks/:user_id",
  tokenAuthorization,
  dailyTasksController.index
);

//show
generalRouter.get(
  "/daily/task/:task_id",
  tokenAuthorization,
  dailyTasksController.show
);

//store
generalRouter.post(
  "/daily/addtask",
  tokenAuthorization,
  dailyTasksController.store
);

//update
generalRouter.put(
  "/daily/updatetask/:task_id",
  tokenAuthorization,
  dailyTasksController.update
);

//delete
generalRouter.delete(
  "/daily/tasks/:task_id",
  tokenAuthorization,
  dailyTasksController.destroy
);

module.exports = generalRouter;
