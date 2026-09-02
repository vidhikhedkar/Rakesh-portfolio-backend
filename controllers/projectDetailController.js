import mongoose from "mongoose";

import ProjectDetail from "../models/ProjectDetail.js";
import Project from "../models/Project.js";


// ============================================================
// GET ALL PROJECT DETAILS
// ============================================================

export const getProjectDetails = async (req, res) => {
    try {
        const details = await ProjectDetail.find()
            .populate("project")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: details.length,
            data: details,
        });

    } catch (error) {

        console.error(
            "Error fetching project details:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch project details.",
            error: error.message,
        });
    }
};


// ============================================================
// GET PROJECT DETAILS BY PROJECT ID
// ============================================================

export const getProjectDetail = async (req, res) => {
    try {

        const { projectId } = req.params;


        // Check valid MongoDB ObjectId

        if (!mongoose.Types.ObjectId.isValid(projectId)) {

            return res.status(400).json({
                success: false,
                message: "Invalid project ID.",
            });

        }


        const detail = await ProjectDetail.findOne({
            project: projectId,
        }).populate("project");


        if (!detail) {

            return res.status(404).json({
                success: false,
                message: "Project details not found.",
            });

        }


        res.status(200).json({
            success: true,
            data: detail,
        });


    } catch (error) {

        console.error(
            "Error fetching project detail:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch project detail.",
            error: error.message,
        });
    }
};


// ============================================================
// CREATE PROJECT DETAILS
// ============================================================

export const createProjectDetail = async (req, res) => {
    try {

        const {
            projectId,
            ...details
        } = req.body;


        // ------------------------------------------------------
        // CHECK PROJECT ID
        // ------------------------------------------------------

        if (!projectId) {

            return res.status(400).json({
                success: false,
                message: "projectId is required.",
            });

        }


        if (!mongoose.Types.ObjectId.isValid(projectId)) {

            return res.status(400).json({
                success: false,
                message: "Invalid project ID.",
            });

        }


        // ------------------------------------------------------
        // CHECK PROJECT EXISTS
        // ------------------------------------------------------

        const project = await Project.findById(projectId);


        if (!project) {

            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });

        }


        // ------------------------------------------------------
        // CHECK DUPLICATE
        // ------------------------------------------------------

        const existingDetail =
            await ProjectDetail.findOne({
                project: projectId,
            });


        if (existingDetail) {

            return res.status(409).json({
                success: false,
                message:
                    "Project details already exist. Use update instead.",
                data: existingDetail,
            });

        }


        // ------------------------------------------------------
        // CREATE
        // ------------------------------------------------------

        const projectDetail =
            await ProjectDetail.create({
                project: projectId,
                ...details,
            });


        // ------------------------------------------------------
        // POPULATE PROJECT
        // ------------------------------------------------------

        await projectDetail.populate("project");


        res.status(201).json({
            success: true,
            message:
                "Project details created successfully.",
            data: projectDetail,
        });


    } catch (error) {

        console.error(
            "Error creating project details:",
            error
        );


        // Duplicate key error

        if (error.code === 11000) {

            return res.status(409).json({
                success: false,
                message:
                    "Project details already exist for this project.",
            });

        }


        res.status(500).json({
            success: false,
            message:
                "Failed to create project details.",
            error: error.message,
        });
    }
};


// ============================================================
// UPDATE PROJECT DETAILS
// ============================================================

export const updateProjectDetail = async (req, res) => {
    try {

        const {
            projectId,
            ...details
        } = req.body;


        // ------------------------------------------------------
        // CHECK PROJECT ID
        // ------------------------------------------------------

        if (!projectId) {

            return res.status(400).json({
                success: false,
                message: "projectId is required.",
            });

        }


        if (!mongoose.Types.ObjectId.isValid(projectId)) {

            return res.status(400).json({
                success: false,
                message: "Invalid project ID.",
            });

        }


        // ------------------------------------------------------
        // CHECK PROJECT
        // ------------------------------------------------------

        const project = await Project.findById(projectId);


        if (!project) {

            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });

        }


        // ------------------------------------------------------
        // UPDATE
        // ------------------------------------------------------

        const updatedDetail =
            await ProjectDetail.findOneAndUpdate(

                {
                    project: projectId,
                },

                {
                    $set: details,
                },

                {
                    new: true,
                    runValidators: true,
                    upsert: true,
                }
            ).populate("project");


        res.status(200).json({
            success: true,
            message:
                "Project details updated successfully.",
            data: updatedDetail,
        });


    } catch (error) {

        console.error(
            "Error updating project details:",
            error
        );


        res.status(500).json({
            success: false,
            message:
                "Failed to update project details.",
            error: error.message,
        });
    }
};


// ============================================================
// DELETE PROJECT DETAILS
// ============================================================

export const deleteProjectDetail = async (req, res) => {
    try {

        const { projectId } = req.params;


        if (!mongoose.Types.ObjectId.isValid(projectId)) {

            return res.status(400).json({
                success: false,
                message: "Invalid project ID.",
            });

        }


        const deletedDetail =
            await ProjectDetail.findOneAndDelete({
                project: projectId,
            });


        if (!deletedDetail) {

            return res.status(404).json({
                success: false,
                message:
                    "Project details not found.",
            });

        }


        res.status(200).json({
            success: true,
            message:
                "Project details deleted successfully.",
            data: deletedDetail,
        });


    } catch (error) {

        console.error(
            "Error deleting project details:",
            error
        );


        res.status(500).json({
            success: false,
            message:
                "Failed to delete project details.",
            error: error.message,
        });
    }
};