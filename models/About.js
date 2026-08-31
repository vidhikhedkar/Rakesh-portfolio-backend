const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  period: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  points: { type: String, required: true }
});

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true }
});

const AboutSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  imageUrl: { type: String, required: true },
  experiences: [ExperienceSchema],
  education: [EducationSchema]
}, { timestamps: true });

module.exports = mongoose.model("About", AboutSchema);