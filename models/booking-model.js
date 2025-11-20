const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  checkin: {
    type: Date,
    required: true,
  },
  checkout: {
    type: Date,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  guest: {
    type: Number,
    required: true,
    min: 1,
  },
  room: {
    type: Number,
    required: true,
    min: 1,
  },
    villaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card", 
    required: true,
  },
})

module.exports = mongoose.model("Booking", bookingSchema);
