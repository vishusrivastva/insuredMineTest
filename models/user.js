const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    dob: Date,
    address: String,
    phoneNumber: String,
    state: String,
    zipCode: String,
    email: String,
    gender: String,
    userType: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
