const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const errorHandler = require("./middleware/errorhandler");
const openapiSpec = require("./docs/openapi.json");

// Connect to the database
const connectedDb = require("./common/db");
connectedDb();

const app = express();

// ---- Global middleware ----
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---- API documentation (Swagger UI) ----
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));
app.get("/openapi.json", (req, res) => res.json(openapiSpec));

// ---- Service info & health ----
app.get("/", (req, res) =>
  res.json({ name: "Voting System API", docs: "/api-docs", health: "/health" })
);
app.get("/health", (req, res) =>
  res.json({ status: "ok", uptime: process.uptime() })
);

// ---- Routes ----
app.use("/candidate", require("./routes/candidate"));
app.use("/user", require("./routes/user"));

// ---- 404 + central error handler ----
app.use((req, res, next) => {
  res.status(404);
  next(new Error("Not found"));
});
app.use(errorHandler);

module.exports = app;
