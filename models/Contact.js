const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    websiteUrl: { type: String, default: "" },
    twitterUrl: { type: String, default: "" },
    instagramUrl: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);