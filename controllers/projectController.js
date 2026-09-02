import mongoose from "mongoose";
import Project from "../models/Project.js";

// Get all projects sorted by order
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1 });
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get single project by ID (includes all embedded details)
export const getProjectDetail = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid project ID." });
        }

        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found." });
        }

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        console.error("Error fetching project detail:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Bulk overwrite projects list
export const updateProjects = async (req, res) => {
    try {
        const { projects } = req.body;
        await Project.deleteMany({});
        const savedProjects = await Project.insertMany(projects);
        res.status(200).json({ success: true, data: savedProjects });
    } catch (error) {
        console.error("Error updating projects:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Update or create a single project document (with full details)
export const updateProjectDetail = async (req, res) => {
    try {
        const { id } = req.params;

        if (id && !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid project ID." });
        }

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            message: "Project updated successfully.",
            data: updatedProject,
        });
    } catch (error) {
        console.error("Error updating project detail:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Delete single project
export const deleteProjectDetail = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid project ID." });
        }

        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ success: false, message: "Project not found." });
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully.",
            data: deletedProject,
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};