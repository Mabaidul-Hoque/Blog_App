const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.get("/all", (req, res) => {
  console.log("all route ok");
  res.status(200).json("all route");
});

module.exports = app;
