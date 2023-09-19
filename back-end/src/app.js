const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const habitsRouter = require("./habits/habits.router");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/habits", habitsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
