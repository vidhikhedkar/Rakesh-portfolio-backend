const mongoose = require('mongoose');

const homeContentSchema = new mongoose.Schema({
    role: { type: String, required: true, default: "UI/UX DESIGNER" },
    firstName: { type: String, required: true, default: "Rakesh" },
    lastName: { type: String, required: true, default: "Parvathneni" },
    location: { type: String, required: true, default: "I am a UI/UX Designer based in Hyderabad." },
    imageUrl: { type: String, default: "" },
    experienceYears: { type: String, default: "07" },
    clientsCount: { type: String, default: "+125" },
    totalProjectsCount: { type: String, default: "+210" },
    tickerText: { type: String, default: "K AND FEATURED" },
    ctaHeading: { type: String, default: "Let's work together." },
    services: [{
        title: { type: String, required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('HomeContent', homeContentSchema);