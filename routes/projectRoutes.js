const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const {
    getProjects,
    getProjectDetail,
    updateProjects,
    updateProjectDetail,
    deleteProjectDetail,
} = require("../controllers/projectController");

const router = express.Router();


// ============================================================
// CLOUDINARY CONFIG
// ============================================================

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// ============================================================
// MULTER
// ============================================================

const storage = multer.memoryStorage();

const upload = multer({
    storage,
});


// ============================================================
// GET ALL PROJECTS
// GET /api/projects
// ============================================================

router.get("/", getProjects);


// ============================================================
// UPDATE PROJECT LIST
// PUT /api/projects
// ============================================================

router.put("/", updateProjects);


// ============================================================
// CLOUDINARY IMAGE UPLOAD
// POST /api/projects/upload
// ============================================================
// IMPORTANT:
// Keep this BEFORE /:id
// ============================================================

router.post(
    "/upload",
    upload.single("image"),
    async (req, res) => {
        try {
            console.log(
                "UPLOAD REQUEST RECEIVED"
            );

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded",
                });
            }

            console.log(
                "FILE RECEIVED:",
                req.file.originalname
            );

            const stream =
                cloudinary.uploader.upload_stream(
                    {
                        folder: "portfolio_projects",
                        resource_type: "image",
                    },
                    (error, result) => {
                        if (error) {
                            console.error(
                                "Cloudinary upload error:",
                                error
                            );

                            return res.status(500).json({
                                success: false,
                                message:
                                    "Cloudinary upload failed",
                                error: error.message,
                            });
                        }

                        console.log(
                            "CLOUDINARY URL:",
                            result.secure_url
                        );

                        return res.status(200).json({
                            success: true,
                            message:
                                "Image uploaded successfully",
                            imageUrl:
                                result.secure_url,
                        });
                    }
                );

            stream.end(req.file.buffer);

        } catch (error) {
            console.error(
                "Image upload server error:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Server error during image upload",
                error: error.message,
            });
        }
    }
);


// ============================================================
// GET SINGLE PROJECT
// GET /api/projects/:id
// ============================================================

router.get("/:id", getProjectDetail);


// ============================================================
// UPDATE SINGLE PROJECT
// PUT /api/projects/:id
// ============================================================

router.put("/:id", updateProjectDetail);


// ============================================================
// DELETE SINGLE PROJECT
// DELETE /api/projects/:id
// ============================================================

router.delete(
    "/:id",
    deleteProjectDetail
);


module.exports = router;