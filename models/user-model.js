const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 3,
  },

  contact: {
    type: String,
    trim: true,
  },

  location: {
    type: String,
    trim: true,
  },

  role: {
    type: String,
    enum: ["admin", "user"], 
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
