const express = require("express");
const generalRouter = express.Router();
const { tokenAuthorization } = require("../middlewares/tokenAuthorization");

//TASKS CRUD
const tasksController = require("../controllers/tasksController");

//index
generalRouter.get("/tasks/:user_id", tokenAuthorization, tasksController.index);
//store
generalRouter.post("/addtask", tokenAuthorization, tasksController.store);

module.exports = generalRouter;
