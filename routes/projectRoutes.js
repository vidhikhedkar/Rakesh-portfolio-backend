const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2; // Import cloudinary
const { getProjects, updateProjects } = require('../controllers/projectController.js');

const router = express.Router();

// Configure Cloudinary with your credentials (ensure these are in your .env file)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for file storage (saving to memory as a buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', getProjects);
router.put('/', updateProjects);

// Cloudinary Upload Route
router.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Stream the file buffer directly to Cloudinary
        const stream = cloudinary.uploader.upload_stream(
            { folder: "portfolio_projects" }, // Optional: organize inside a folder on Cloudinary
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    return res.status(500).json({ message: "Cloudinary upload failed" });
                }

                // Return the hosted Cloudinary URL back to the frontend
                res.status(200).json({ imageUrl: result.secure_url });
            }
        );

        stream.end(req.file.buffer);
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Server error during upload" });
    }
});

module.exports = router;