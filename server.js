require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = express.Router();
const bodyParser = require("body-parser");

const todo = require("./app/routes/todo");
const dbConnect = require("./app/db/dbconnect");

module.exports = router;
const app = express();

// execute database connection
dbConnect();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ status: 'development' });
});

app.use("/api", todo);

module.exports = app;

const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});