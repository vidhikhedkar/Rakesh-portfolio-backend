const mongoose = require('mongoose');

const serviceOfferingSchema = new mongoose.Schema({
    num: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    cardDesc: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('ServiceOffering', serviceOfferingSchema);