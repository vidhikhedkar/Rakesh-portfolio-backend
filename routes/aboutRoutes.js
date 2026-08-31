const express = require("express");
const router = express.Router();
const { getAboutData, updateAboutData } = require("../controllers/aboutController");

// Route: GET /api/about
router.get("/", getAboutData);

// Route: PUT /api/about
router.put("/", updateAboutData);

module.exports = router;