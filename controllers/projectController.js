import Project from "../models/Project.js";


export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1 });
        console.log("Fetched Projects:", projects);
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const updateProjects = async (req, res) => {
    try {
        const { projects } = req.body; 
        // console.log("Incoming Projects Update:", projects);
        await Project.deleteMany({});
        const savedProjects = await Project.insertMany(projects);
        res.status(200).json(savedProjects);
    } catch (error) {
        console.error("Error updating projects:", error);
        res.status(500).json({ message: "Server error" });
    }
};