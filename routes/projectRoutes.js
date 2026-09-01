const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { getProjects, updateProjects } = require('../controllers/projectController.js');

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', getProjects);
router.put('/', updateProjects);


router.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const stream = cloudinary.uploader.upload_stream(
            { folder: "portfolio_projects" },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    return res.status(500).json({ message: "Cloudinary upload failed" });
                }
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