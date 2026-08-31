const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: ''
        },

        handle: {
            type: String,
            default: ''
        },

        avatar: {
            type: String,
            default: ''
        },

        about: {
            type: String,
            default: ''
        },

        experience: {
            duration: {
                type: String,
                default: ''
            },
            role: {
                type: String,
                default: ''
            },
            company: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            }
        },

        education: [
            {
                title: {
                    type: String,
                    default: ''
                },
                academy: {
                    type: String,
                    default: ''
                }
            }
        ],

        skills: [
            {
                type: String
            }
        ],

        tools: [
            {
                type: String
            }
        ],

        certification: [
            {
                title: {
                    type: String,
                    default: ''
                },
                academy: {
                    type: String,
                    default: ''
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Profile', profileSchema);