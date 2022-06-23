// Module imports.

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const ejs = require("ejs");

// Setting up imports for use.

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect(process.env.MONGO_DB);

// Global Variables.

const PORT = process.env.PORT;

// Get routes.

app.get("/", function(req, res) {
  res.send("Hello");
});

app.listen(PORT, function() {
  console.log("Server started on port " + PORT);
});