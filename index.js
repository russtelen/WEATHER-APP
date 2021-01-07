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
  res.render("index");
});

// post
app.post("/", (req, res) => {
  const { city, countryCode } = req.body;
  const APIKey = process.env.API_KEY;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${APIKey}&units=metric`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  function getWeatherData() {
    return axios.get(URL, config).then((response) => response.data);
  }
  let weatherData = getWeatherData();
  weatherData.then((result) => {
    console.log(result);

    if (result) {
      res.render("weather", { ...result });
    } else {
      res.redirect("/");
    }
  });
});
// ==============================================
// LISTEN
app.listen(5000, () => {
  console.log("Connected to Port 5000!");
});
