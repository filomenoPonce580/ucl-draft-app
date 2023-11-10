const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const app = express();

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

app.use(cors());
app.use(express.json());

const usersRouter = require("./users/users.router");
const teamsRouter = require("./teams/teams.router");
const uclDataRouter = require("./uclData/uclData.router")

app.use("/users", usersRouter);
app.use("/teams", teamsRouter)
app.use("/fetchUCLData", uclDataRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;