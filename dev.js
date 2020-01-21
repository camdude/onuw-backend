require("dotenv").config(); // load env vars from .env file
const express = require("express");
const mongoose = require("mongoose");

const rolesetRoutes = require("./routes/roleset-routes");

const { MONGO_ADDRESS } = process.env;

// set up db connection
mongoose.connect(MONGO_ADDRESS);
mongoose.Promise = global.Promise;

const app = express();

app.use("/roleset", rolesetRoutes);

app.listen(3000);