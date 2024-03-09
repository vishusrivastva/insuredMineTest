// Import any required models here
const Agent = require("../models/agent");
const Carrier = require("../models/carrier");
const Lob = require("../models/lob");
const User = require("../models/user");
const UserAccount = require("../models/userAccount");
const Policy = require("../models/policy");


// Define your service methods
exports.getExamples = async () => {
  return await Agent.find();
};

exports.createExample = async (name) => {
  const Agent = new Example({ name });
  return await Agent.save();
};
