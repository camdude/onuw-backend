require("dotenv").config(); // load env vars from .env file
const express = require("express");
const mongoose = require("mongoose");

const rolesetRoutes = require("./routes/roleset-routes");
const userRoutes = require("./routes/user-routes");

const { MONGO_ADDRESS } = process.env;

// set up db connection
mongoose.connect(MONGO_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
console.log("[server:dev]", "Connected to database");

const app = express();

app.use("/api/roleset", rolesetRoutes);
app.use("/api/user", userRoutes);

app.listen(5000);
console.log("[server:dev]", "Now listening at http://localhost:5000/");
