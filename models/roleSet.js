const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSetSchema = new Schema({
  expansions: [{ type: String, required: true }],
  roles: [{ type: String, required: true }],
  title: { type: String, required: true },
  players: { type: Number, required: false },
  complexity: { type: String, required: true },
  rating: { type: Number, required: false },
  username: { type: String, required: true },
  desc: { type: String, required: false },
});

module.exports = mongoose.model("RoleSet", roleSetSchema);
