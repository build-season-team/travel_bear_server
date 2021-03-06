const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema(
  {
    houseTitle: {
      type: String,
      required: [true, "A user must have a name"],
      maxlength: [40, "Name must be less than 40 characters"],
      minlength: [4, "Name must be more than 4 characters"],
    },
    description: {
      type: String,
      required: [true, "A user must have a description"],
      maxlength: [500, "Description must be less than 500 characters"],
      minlength: [4, "Description must be more than 4 characters"],
    },
    houseRules: {
      type: String,
      required: [true, "A user must have a house rules"],
      maxlength: [500, "House rules must be less than 500 characters"],
      minlength: [4, "House rules must be more than 4 characters"],
    },
    amount: {
      type: Number,
      required: [true, "A user must have a price"],
      maxlength: [500, "Description must be less than 500 characters"],
      minlength: [4, "Description must be more than 4 characters"],
    },
    address: {
      type: String,
      required: [true, "A user must have a location"],
      maxlength: [500, "Description must be less than 500 characters"],
      minlength: [4, "Description must be more than 4 characters"],
    },
    image: {
      type: Array,
      required: [true, "A user must have an image"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    city: {
      type: String,
      required: [true, "A user must have a city"],
      maxlength: [500, "Description must be less than 500 characters"],
      minlength: [4, "Description must be more than 4 characters"],
    },
    state: {
      type: String,
      required: [true, "A apartment must have a state"],
      maxlength: [20, "Description must be less than 500 characters"],
      minlength: [4, "Description must be more than 4 characters"],
    },

    roomCondition: {
      type: String,
      required: [true, "An apartment must have a room condition"],
      enum: ["good", "excellent", "others"],
      default: "good",
    },

    isEnabled: {
      type: Boolean,
      default: true,
    },
    isOccupied: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    visited: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    trips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trips",
      },
    ],
    ratingsAverage: {
      type: Number,
      default: 4.1,
      set: (val) => Math.round(val * 10) / 10,
    },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
module.exports = mongoose.model("Apartment", apartmentSchema);
