const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  apartment: {
    type: mongoose.Schema.ObjectId,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  message: {
    type: String,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;