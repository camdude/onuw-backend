var express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const rolesetRoutes = require("./routes/roleset-routes");

const { MONGO_ADDRESS} = process.env

mongoose.connect(MONGO_ADDRESS);
mongoose.Promise = global.Promise;

var app = express();
app.use(bodyParser.json({}));

app.use("/roleset", rolesetRoutes);

module.exports = app;