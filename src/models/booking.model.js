// create a model for the users reviews
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
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
    amount: {
      type: Number,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

// bookingSchema.pre(/^find/, function (next) {
//   this.populate("user").populate("apartment");
//   next();
// });

module.exports = mongoose.model("Booking", bookingSchema);
