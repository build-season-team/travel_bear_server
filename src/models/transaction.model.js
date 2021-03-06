
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "please input amount"],
    },
    ref: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["payment", "withdrawal"],
    },
    status: {
      type: String,
      enum: ["successful", "failed", "pending"],
      default: "pending",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bankName: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

// transactionSchema.pre(/^find/, function (next) {
//   this.populate("user");
//   next();
// });

module.exports = mongoose.model("Transaction", transactionSchema);