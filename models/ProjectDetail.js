import mongoose from "mongoose";

// ============================================================
// ECOSYSTEM ITEM
// ============================================================

const ecosystemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "",
        },

        description: {
            type: String,
            default: "",
        },

        icon: {
            type: String,
            default: "",
        },

        position: {
            type: String,
            default: "",
        },
    },
    { _id: true }
);


// ============================================================
// CHALLENGE / APPROACH
// ============================================================

const textSectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "",
        },

        paragraphs: {
            type: [String],
            default: [],
        },
    },
    { _id: false }
);


// ============================================================
// STRATEGIC OVERVIEW ITEM
// ============================================================

const strategicItemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "",
        },

        description: {
            type: String,
            default: "",
        },
    },
    { _id: false }
);


// ============================================================
// STRATEGIC OVERVIEW
// ============================================================

const strategicOverviewSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            default: "Strategic Overview",
        },

        title: {
            type: String,
            default: "Project Deep Dive",
        },

        goal: {
            type: strategicItemSchema,
            default: () => ({}),
        },

        process: {
            type: strategicItemSchema,
            default: () => ({}),
        },

        impact: {
            type: strategicItemSchema,
            default: () => ({}),
        },
    },
    { _id: false }
);


// ============================================================
// CHALLENGE CARD
// ============================================================

const challengeCardSchema = new mongoose.Schema(
    {
        icon: {
            type: String,
            default: "",
        },

        title: {
            type: String,
            default: "",
        },

        description: {
            type: String,
            default: "",
        },
    },
    { _id: true }
);


// ============================================================
// CHALLENGE SECTION
// ============================================================

const challengeSectionSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            default: "The Challenge",
        },

        title: {
            type: String,
            default: "",
        },

        cards: {
            type: [challengeCardSchema],
            default: [],
        },
    },
    { _id: false }
);


// ============================================================
// OUTCOME CARD
// ============================================================

const outcomeCardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "",
        },

        description: {
            type: String,
            default: "",
        },
    },
    { _id: true }
);


// ============================================================
// OUTCOME
// ============================================================

const outcomeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "THE OUTCOME",
        },

        description: {
            type: String,
            default: "",
        },

        cards: {
            type: [outcomeCardSchema],
            default: [],
        },
    },
    { _id: false }
);


// ============================================================
// MAIN PROJECT DETAIL SCHEMA
// ============================================================

const projectDetailSchema = new mongoose.Schema(
    {
        // --------------------------------------------------------
        // LINK TO PROJECT
        // --------------------------------------------------------

        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
            unique: true,
        },


        // --------------------------------------------------------
        // 1. HEADER
        // --------------------------------------------------------

        subtitle: {
            type: String,
            default: "",
        },

        description: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            default: "",
        },

        category: {
            type: String,
            default: "",
        },

        year: {
            type: String,
            default: "",
        },


        // --------------------------------------------------------
        // 2. PROJECT INFORMATION
        // --------------------------------------------------------

        projectName: {
            type: String,
            default: "",
        },

        platform: {
            type: String,
            default: "",
        },

        tools: {
            type: String,
            default: "",
        },

        scope: {
            type: String,
            default: "",
        },


        // --------------------------------------------------------
        // 3. HERO IMAGE
        // --------------------------------------------------------

        heroImage: {
            type: String,
            default: "",
        },


        // --------------------------------------------------------
        // 4. BRAND & EDITORIAL
        // --------------------------------------------------------

        brandImage: {
            type: String,
            default: "",
        },

        editorialImage: {
            type: String,
            default: "",
        },


        // --------------------------------------------------------
        // 5. PRODUCT
        // --------------------------------------------------------

        productTitle: {
            type: String,
            default: "THE PRODUCT",
        },

        productDescription: {
            type: String,
            default: "",
        },

        productDescriptionTwo: {
            type: String,
            default: "",
        },


        // --------------------------------------------------------
        // 6. ECOSYSTEM
        // --------------------------------------------------------

        ecosystem: {
            type: [ecosystemSchema],
            default: [],
        },


        // --------------------------------------------------------
        // 7. CHALLENGE
        // --------------------------------------------------------

        challenge: {
            type: textSectionSchema,
            default: () => ({
                title: "THE CHALLENGE",
                paragraphs: [],
            }),
        },


        // --------------------------------------------------------
        // 7. APPROACH
        // --------------------------------------------------------

        approach: {
            type: textSectionSchema,
            default: () => ({
                title: "THE APPROACH",
                paragraphs: [],
            }),
        },


        // --------------------------------------------------------
        // 8. SECTION IMAGES
        // --------------------------------------------------------

        sectionImages: {
            type: [String],
            default: [],
        },


        // --------------------------------------------------------
        // 9. STRATEGIC OVERVIEW
        // --------------------------------------------------------

        strategicOverview: {
            type: strategicOverviewSchema,
            default: () => ({}),
        },


        // --------------------------------------------------------
        // 10. PROJECT METADATA
        // --------------------------------------------------------

        client: {
            type: String,
            default: "",
        },

        metadataCategory: {
            type: String,
            default: "",
        },

        metadataTools: {
            type: String,
            default: "",
        },


        // --------------------------------------------------------
        // 11. EXPERIENCE / RESULTS
        // --------------------------------------------------------

        experienceTitle: {
            type: String,
            default: "",
        },

        achievements: {
            type: [String],
            default: [],
        },


        // --------------------------------------------------------
        // 12. SECTION 7 IMAGE
        // --------------------------------------------------------

        section7Image: {
            type: String,
            default: "",
        },


        // --------------------------------------------------------
        // 13. CHALLENGE CARDS
        // --------------------------------------------------------

        challengeSection: {
            type: challengeSectionSchema,
            default: () => ({}),
        },


        // --------------------------------------------------------
        // 14. SECTION 9 IMAGE
        // --------------------------------------------------------

        section9Image: {
            type: String,
            default: "",
        },


        // --------------------------------------------------------
        // 15. OUTCOME
        // --------------------------------------------------------

        outcome: {
            type: outcomeSchema,
            default: () => ({}),
        },


        // --------------------------------------------------------
        // 16. FOOTER
        // --------------------------------------------------------

        footerTitle: {
            type: String,
            default: "",
        },
    },

    {
        timestamps: true,
        minimize: false,
    }
);


export default mongoose.model(
    "ProjectDetail",
    projectDetailSchema
);