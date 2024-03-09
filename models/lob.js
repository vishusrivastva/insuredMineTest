const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lobSchema = new Schema({
    categoryName: {
        type: String,
        required: true
    }
});

const Lob = mongoose.model('Lob', lobSchema);

module.exports = Lob;
