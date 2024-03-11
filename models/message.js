const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: String,
  day: String,
  time: String,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
