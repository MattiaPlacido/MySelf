const express = require("express");
const generalRouter = express.Router();

//TO-DOS CRUD
const tasksController = require("../controllers/tasksController");

//index
generalRouter.get("/tasks/:user_id", tasksController.index);
//store
generalRouter.post("/addtask", tasksController.store);

module.exports = generalRouter;
