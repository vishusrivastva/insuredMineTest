const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carrierSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
});

const Carrier = mongoose.model("Carrier", carrierSchema);

module.exports = Carrier;
