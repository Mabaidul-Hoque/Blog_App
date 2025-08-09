const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog App API",
      version: "1.0.0",
      description: "A RESTful API for a blog application",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to the API routes
};

const specs = swaggerJsdoc(swaggerOptions);

app.use(cors());

app.use(bodyParser.json());

// Root route for API status and documentation
app.get("/", (req, res) => {
  res.send("API is running. Visit /api-docs for documentation.");
});

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/blogApp/", router);

module.exports = app;
