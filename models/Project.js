import mongoose from "mongoose";

// Sub-schemas
const ecosystemSchema = new mongoose.Schema(
    {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        icon: { type: String, default: "" },
        position: { type: String, default: "" },
    },
    { _id: true }
);

const textSectionSchema = new mongoose.Schema(
    {
        title: { type: String, default: "" },
        paragraphs: { type: [String], default: [] },
    },
    { _id: false }
);

const strategicItemSchema = new mongoose.Schema(
    {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
    },
    { _id: false }
);

const strategicOverviewSchema = new mongoose.Schema(
    {
        label: { type: String, default: "Strategic Overview" },
        title: { type: String, default: "Project Deep Dive" },
        goal: { type: strategicItemSchema, default: () => ({}) },
        process: { type: strategicItemSchema, default: () => ({}) },
        impact: { type: strategicItemSchema, default: () => ({}) },
    },
    { _id: false }
);

const challengeCardSchema = new mongoose.Schema(
    {
        icon: { type: String, default: "" },
        title: { type: String, default: "" },
        description: { type: String, default: "" },
    },
    { _id: true }
);

const challengeSectionSchema = new mongoose.Schema(
    {
        label: { type: String, default: "The Challenge" },
        title: { type: String, default: "" },
        cards: { type: [challengeCardSchema], default: [] },
    },
    { _id: false }
);

const outcomeCardSchema = new mongoose.Schema(
    {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
    },
    { _id: true }
);

const outcomeSchema = new mongoose.Schema(
    {
        title: { type: String, default: "THE OUTCOME" },
        description: { type: String, default: "" },
        cards: { type: [outcomeCardSchema], default: [] },
    },
    { _id: false }
);

// Main Unified Project Schema
const projectSchema = new mongoose.Schema(
    {
        // Core Project Fields
        title: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        order: { type: Number, default: 0 },

        // Header & Metadata
        subtitle: { type: String, default: "" },
        description: { type: String, default: "" },
        role: { type: String, default: "" },
        year: { type: String, default: "" },
        projectName: { type: String, default: "" },
        platform: { type: String, default: "" },
        tools: { type: String, default: "" },
        scope: { type: String, default: "" },
        client: { type: String, default: "" },
        metadataCategory: { type: String, default: "" },
        metadataTools: { type: String, default: "" },

        // Images
        heroImage: { type: String, default: "" },
        brandImage: { type: String, default: "" },
        editorialImage: { type: String, default: "" },
        sectionImages: { type: [String], default: [] },
        section7Image: { type: String, default: "" },
        section9Image: { type: String, default: "" },

        // Product Section
        productTitle: { type: String, default: "THE PRODUCT" },
        productDescription: { type: String, default: "" },
        productDescriptionTwo: { type: String, default: "" },

        // Nested Complex Sections
        ecosystem: { type: [ecosystemSchema], default: [] },
        challenge: {
            type: textSectionSchema,
            default: () => ({ title: "THE CHALLENGE", paragraphs: [] }),
        },
        approach: {
            type: textSectionSchema,
            default: () => ({ title: "THE APPROACH", paragraphs: [] }),
        },
        strategicOverview: {
            type: strategicOverviewSchema,
            default: () => ({}),
        },
        challengeSection: {
            type: challengeSectionSchema,
            default: () => ({}),
        },
        outcome: {
            type: outcomeSchema,
            default: () => ({}),
        },

        // Experience & Results
        experienceTitle: { type: String, default: "" },
        achievements: { type: [String], default: [] },
        footerTitle: { type: String, default: "" },
    },
    {
        timestamps: true,
        minimize: false,
    }
);

export default mongoose.model("Project", projectSchema);