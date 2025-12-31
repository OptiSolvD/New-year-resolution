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
  email: { type: String, unique: true },
  password: { type: String, default: null },
provider: { 
  type: String, 
  enum: ["local", "google"], 
  default: "local" 
},

  resolutions: [resolutionSchema]
});

module.exports = mongoose.model("User", userSchema);
