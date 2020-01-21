const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSetSchema = new Schema({
  title: { type: String, required: true },
  players: { type: Number, required: false },
  complexity: { type: String, required: true },
  rating: { type: Number, required: false },
  expansions: [{ type: String, required: true }],
  desc: { type: String, required: false },
  roles: [{ type: String, required: true }]
});

module.exports = mongoose.model("RoleSet", roleSetSchema);
