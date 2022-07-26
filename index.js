const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connection = require("./connection");
const userRoute = require("./routes/user");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRoute);

module.exports = app;
