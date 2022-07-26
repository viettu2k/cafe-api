const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connection = require("./connection");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = app;
