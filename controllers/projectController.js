import mongoose from "mongoose";
import Project from "../models/Project.js";


// ============================================================
// GET ALL PROJECTS
// GET /api/projects
// ============================================================

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });

    } catch (error) {
        console.error("Error fetching projects:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


// ============================================================
// CREATE NEW PROJECT
// POST /api/projects
// ============================================================

export const createProject = async (req, res) => {
    try {
        const {
            title,
            category,
            image,
            order,
        } = req.body;

        if (!title || !category) {
            return res.status(400).json({
                success: false,
                message: "Title and category are required.",
            });
        }

        const project = await Project.create({
            title,
            category,
            image: image || "",
            order: order ?? 0,
        });

        res.status(201).json({
            success: true,
            message: "Project created successfully.",
            data: project,
        });

    } catch (error) {
        console.error("Error creating project:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


// ============================================================
// GET SINGLE PROJECT
// GET /api/projects/:id
// ============================================================

export const getProjectDetail = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID.",
            });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }

        res.status(200).json({
            success: true,
            data: project,
        });

    } catch (error) {
        console.error("Error fetching project detail:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


// ============================================================
// UPDATE SINGLE PROJECT
// PUT /api/projects/:id
// ============================================================

export const updateProjectDetail = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID.",
            });
        }

        const existingProject = await Project.findById(id);

        if (!existingProject) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }

        /*
         * IMPORTANT:
         *
         * $set updates ONLY the fields sent by frontend.
         *
         * It does NOT delete the other project fields.
         *
         * This is important because ProjectDetailsTab stores
         * lots of additional information in this document.
         */

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Project updated successfully.",
            data: updatedProject,
        });

    } catch (error) {
        console.error("Error updating project:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


// ============================================================
// DELETE SINGLE PROJECT
// DELETE /api/projects/:id
// ============================================================

export const deleteProjectDetail = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID.",
            });
        }

        const deletedProject =
            await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully.",
            data: deletedProject,
        });

    } catch (error) {
        console.error("Error deleting project:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};