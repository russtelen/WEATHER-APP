// REQUIRE
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios").default;
// ==============================================
// CONFIG
// Serving static assets
app.use(express.static(path.join(__dirname, "/public")));

//Parsing Middlewares
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(express.json()); // JSON

//Setting up the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
// ==============================================
// ROUTES
// get
app.get("/", (req, res) => {
  res.send("connected!");
});

// ==============================================
// LISTEN
app.listen(5000, () => {
  console.log("Connected to Port 5000!");
});
