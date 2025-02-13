//Express initialization
const express = require("express");
const server = express();

server.use(express.json()); //json body parser
//Importing and using cors middleware
var cors = require("cors");
server.use(cors());

//ROUTING
//User data router import and utilization
const userDataRouter = require("./router/userDataRouter");
server.use("/user", userDataRouter);
//General router import and utilization
const generalRouter = require("./router/generalRouter");
server.use("/general", generalRouter);

//MIDDLEWARES
//Importing dotenv ambient variables
require("dotenv").config();
//Page not found handler import and utilization
const notFound = require("./middlewares/notFound");
server.use(notFound);
//Error handler import and utilization
const errorHandler = require("./middlewares/errorHandler");
server.use(errorHandler);

//SERVER LISTENING
server.listen(process.env.APP_PORT, () => {
  console.log("Server is listening at localhost :  " + process.env.APP_PORT);
});
