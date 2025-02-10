//EXPRESS INIT
const express = require("express");
const server = express();

server.use(express.json()); //json body parser
var cors = require("cors");
server.use(cors());

//ROUTING
const userDataRouter = require("./router/userDataRouter");
server.use("/user", userDataRouter);
//GENERAL ROUTER
const generalRouter = require("./router/generalRouter");
server.use("/general", generalRouter);

//MIDDLEWARES
//.env files
require("dotenv").config();
//page not found handler
const notFound = require("./middlewares/notFound");
server.use(notFound);
//error handler
const errorHandler = require("./middlewares/errorHandler");
server.use(errorHandler);

//LISTENING
server.listen(process.env.APP_PORT, () => {
  console.log("Server is listening at localhost :  " + process.env.APP_PORT);
});
