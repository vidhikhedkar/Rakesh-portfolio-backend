const Profile = require('../models/profile');
const cloudinary = require('../utils/cloudinary');

// Get Profile Data
const getProfile = async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (!profile) {
            profile = {
                name: '',
                handle: '',
                avatar: '',
                about: '',
                experience: {
                    duration: '',
                    role: '',
                    company: '',
                    description: ''
                },
                education: [],
                skills: [],
                tools: [],
                certification: []
            };
        }

        if (!Array.isArray(profile.certification)) {
            profile.certification = profile.certification
                ? [profile.certification]
                : [];
        }
        res.status(200).json(profile);
    } catch (err) {
        console.error('Get Profile Error:', err);

        res.status(500).json({
            message: err.message || 'Failed to fetch profile'
        });
    }
};


// Update Profile Data
const updateProfile = async (req, res) => {
    try {
        const {
            name,
            handle,
            about,
            experience,
            education,
            skills,
            tools,
            certification
        } = req.body;
        // console.log('REQUEST BODY:', req.body);
        // console.log('AVATAR TYPE:', typeof req.body.avatar);
        // console.log(
        //     'AVATAR START:',
        //     req.body.avatar?.substring(0, 50)
        // );


        const parsedExperience =
            typeof experience === 'string'
                ? JSON.parse(experience)
                : experience;

        const parsedEducation =
            typeof education === 'string'
                ? JSON.parse(education)
                : education;

        const parsedSkills =
            typeof skills === 'string'
                ? JSON.parse(skills)
                : skills;

        const parsedTools =
            typeof tools === 'string'
                ? JSON.parse(tools)
                : tools;

        let parsedCertification =
            typeof certification === 'string'
                ? JSON.parse(certification)
                : certification;

        if (!Array.isArray(parsedCertification)) {
            parsedCertification = parsedCertification
                ? [parsedCertification]
                : [];
        }


        let profile = await Profile.findOne();

        if (!profile) {
            profile = new Profile({
                name: '',
                handle: '',
                avatar: '',
                about: '',
                experience: {
                    duration: '',
                    role: '',
                    company: '',
                    description: ''
                },
                education: [],
                skills: [],
                tools: [],
                certification: []
            });
        }

        profile.name = name || '';
        profile.handle = handle || '';
        profile.about = about || '';
        if (req.body.avatar) {
            if (
                req.body.avatar.startsWith(
                    'https://res.cloudinary.com/'
                )
            ) {
                profile.avatar = req.body.avatar;
            }
            else if (
                req.body.avatar.startsWith('data:image/')
            ) {

                // console.log(
                //     'Uploading avatar to Cloudinary...'
                // );

                const uploadedImage =
                    await cloudinary.uploader.upload(
                        req.body.avatar,
                        {
                            folder: 'portfolio_profile',
                            resource_type: 'image'
                        }
                    );

                // console.log(
                //     'Cloudinary Avatar URL:',
                //     uploadedImage.secure_url
                // );

                profile.avatar =
                    uploadedImage.secure_url;
            }
        }

        profile.experience =
            parsedExperience || {
                duration: '',
                role: '',
                company: '',
                description: ''
            };

        profile.education =
            Array.isArray(parsedEducation)
                ? parsedEducation
                : [];

        profile.skills =
            Array.isArray(parsedSkills)
                ? parsedSkills
                : [];

        profile.tools =
            Array.isArray(parsedTools)
                ? parsedTools
                : [];

        profile.certification =
            parsedCertification;

        const updatedProfile =
            await profile.save();

        // console.log(
        //     'UPDATED PROFILE:',
        //     updatedProfile
        // );

        res.status(200).json({
            message: 'Data edited successfully!',
            data: updatedProfile
        });
    } catch (err) {
        console.error(
            'UPDATE PROFILE ERROR:',
            err
        );
        res.status(500).json({
            message:
                err.message ||
                'Failed to update profile data'
        });
    }
};


module.exports = { getProfile, updateProfile };