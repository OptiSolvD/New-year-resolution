const mongoose = require("mongoose");

const resolutionSchema = new mongoose.Schema({
  text: String
}, {
  timestamps: true   // <-- auto adds createdAt + updatedAt
});
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  info: String,

  resolutions: [resolutionSchema]
});

module.exports = mongoose.model("User", userSchema);
