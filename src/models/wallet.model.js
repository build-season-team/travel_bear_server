const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  amount: {
    type: Number,
    required: [true, "A wallet must have an amount"],
  },
},{
  timestamps: true,
});

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;