var express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const rolesetRoutes = require("./routes/roleset-routes");
const userRoutes = require("./routes/user-routes");

const { MONGO_ADDRESS } = process.env;

mongoose.connect(MONGO_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
console.log("[server]", "Connected to database");

var app = express();

app.use(bodyParser.json({}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/roleset", rolesetRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
