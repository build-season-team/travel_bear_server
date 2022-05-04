const mongoose = require("mongoose");
const tripsSchema = new mongoose.Schema({
  apartment: {
    type: mongoose.Schema.ObjectId,
    ref: "Apartment",
    required: [true, "A trip must belong to an apartment"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startDate: {
    type: Date,
    required: [true, "A trip must have a start date"],
  },
  endDate: {
    type: Date,
    required: [true, "A trip must have an end date"],
  },
  price: {
    type: Number,
    required: [true, "A trip must have a price"],
  },
  status: {
    type: String,
    enum: ["pending", "occupied", "visited"],
    default: "pending",
  },
});

module.exports = mongoose.model("Trips", tripsSchema);