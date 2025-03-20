const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use("/api/v1/blogApp/", router);

module.exports = app;
