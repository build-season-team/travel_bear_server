// create a model for the users reviews
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new
Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  apartment: {
    type: Schema.Types.ObjectId,
    ref: "Apartment",
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Review", reviewSchema);