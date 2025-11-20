const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  guest: {
    type: Number,
    required: true,
  },
  bedroom: {
    type: Number,
    required: true,
  },
  area: {
    type: String,
    required: true,
    trim: true,
  },
  bathroom: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: [String],
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Card", cardSchema);
