const express = require("express");
const generalRouter = express.Router();

//TO-DOS CRUD
const todosController = require("../controllers/todosController");
const todosCategoryController = require("../controllers/todosCategoryController");

//index
generalRouter.get("/todos/:id", todosController.index);
//store
generalRouter.post("/addtodo", todosController.store);
//store categories
generalRouter.post("/todocategory", todosCategoryController.store);

module.exports = generalRouter;
