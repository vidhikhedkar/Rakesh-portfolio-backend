const HomeContent = require('../models/HomeContent');
const cloudinary = require('../utils/cloudinary');
const streamifier = require('streamifier');


// Helper function to upload buffer stream to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            { folder: "home_profiles" },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};


// Get data
exports.getHomeContent = async (req, res) => {
    try {
        let content = await HomeContent.findOne();
        if (!content) {
            content = await HomeContent.create({
                services: [
                    { title: "Creative" },
                    { title: "Design" },
                    { title: "Development" },
                    { title: "Branding" },
                    { title: "Strategy" }
                ]
            });
        }
        res.status(200).json({ success: true, data: content });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Update data 
exports.updateHomeContent = async (req, res) => {
    try {
        const {
            role,
            firstName,
            lastName,
            location,
            experienceYears,
            clientsCount,
            totalProjectsCount,
            tickerText,
            ctaHeading,
            services
        } = req.body;

        let content = await HomeContent.findOne();
        if (!content) {
            content = new HomeContent({});
        }
        if (req.file) {
            const cloudinaryResponse = await uploadToCloudinary(req.file.buffer);
            content.imageUrl = cloudinaryResponse.secure_url;
        }

        if (role !== undefined) content.role = role;
        if (firstName !== undefined) content.firstName = firstName;
        if (lastName !== undefined) content.lastName = lastName;
        if (location !== undefined) content.location = location;
        if (experienceYears !== undefined) content.experienceYears = experienceYears;
        if (clientsCount !== undefined) content.clientsCount = clientsCount;
        if (totalProjectsCount !== undefined) content.totalProjectsCount = totalProjectsCount;
        if (tickerText !== undefined) content.tickerText = tickerText;
        if (ctaHeading !== undefined) content.ctaHeading = ctaHeading;
        if (services !== undefined) {
            content.services = typeof services === 'string' ? JSON.parse(services) : services;
        }
        const updatedContent = await content.save();
        res.status(200).json({
            success: true,
            message: "Home content updated successfully",
            data: updatedContent
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};