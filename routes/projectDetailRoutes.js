const express = require("express");

const {
    getProjectDetails,
    getProjectDetail,
    createProjectDetail,
    updateProjectDetail,
    deleteProjectDetail,
} = require("../controllers/projectDetailController");

const router = express.Router();


// ============================================================
// GET ALL PROJECT DETAILS
// GET /api/project-details
// ============================================================

router.get("/", getProjectDetails);


// ============================================================
// GET DETAILS FOR ONE PROJECT
// GET /api/project-details/:projectId
// ============================================================

router.get("/:projectId", getProjectDetail);


// ============================================================
// CREATE PROJECT DETAILS
// POST /api/project-details
// ============================================================

router.post("/", createProjectDetail);


// ============================================================
// UPDATE PROJECT DETAILS
// PUT /api/project-details
// ============================================================

router.put("/", updateProjectDetail);




router.delete("/:projectId", deleteProjectDetail);


module.exports = router;