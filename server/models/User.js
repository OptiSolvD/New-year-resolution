const mongoose = require("mongoose");

const resolutionSchema = new mongoose.Schema({

  text: String,

  completed: {
    type: Boolean,
    default: false
  },

  progress: {
    type: Number,
    default: 0
  }

}, { timestamps:true });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  info: String,

  resolutions: [resolutionSchema]
});

module.exports = mongoose.model("User", userSchema);
