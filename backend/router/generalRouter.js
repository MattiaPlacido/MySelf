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

module.exports = generalRouter;
