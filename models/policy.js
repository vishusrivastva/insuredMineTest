const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const policySchema = new Schema({
    policyNumber: {
        type: String,
        required: true
    },
    policyStartDate: Date,
    policyEndDate: Date,
    policyCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Lob',
        required: true
    },
    collectionId: String,
    companyCollectionId: {
        type: Schema.Types.ObjectId,
        ref: 'Carrier'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;
