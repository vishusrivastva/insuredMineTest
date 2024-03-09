const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userAccountSchema = new Schema({
  accountName: {
    type: String,
    required: true,
  },
});

const UserAccount = mongoose.model("UserAccount", userAccountSchema);

module.exports = UserAccount;
