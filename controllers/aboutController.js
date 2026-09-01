const About = require("../models/About");
const cloudinary = require("../utils/cloudinary");

// @desc    Get about/profile information
const getAboutData = async (req, res) => {
  try {
    let aboutData = await About.findOne();

    if (!aboutData) {
      aboutData = await About.create({
        fullName: "Rakesh Parvathneni",
        title: "UI/UX Designer",
        bio: "I'm a UI/UX Designer focused on creating clean, intuitive and engaging digital experiences.",
        imageUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",

        experiences: [
          {
            period: "2025 - Present",
            role: "UI/UX Designer",
            company: "KBK Business Solutions Pvt. Ltd.",
            points:
              "Responsive Web & Landing Page Design\nSaaS & Enterprise Dashboard Design",
          },
        ],

        education: [
          {
            degree: "Certification Diploma in UI/UX Design",
            institution: "Creative Multimedia Academy, Dilsukhnagar",
          },
          {
            degree: "MBA (HR)",
            institution: "Sri Chaitanya Technical Campus (JNTUH)",
          },
          {
            degree: "B.Com",
            institution: "Siddhartha Degree College (OU)",
          },
        ],
      });
    }

    res.status(200).json(aboutData);
  } catch (error) {
    console.error("GET ABOUT ERROR:", error);

    res.status(500).json({
      error: "Server error while fetching about data",
      details: error.message,
    });
  }
};


// @desc    Update about/profile information
const updateAboutData = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      fullName,
      title,
      bio,
      experiences,
      education,
    } = req.body;

    let aboutData = await About.findOne();

    if (!aboutData) {
      aboutData = new About({});
    }

    aboutData.fullName = fullName;
    aboutData.title = title;
    aboutData.bio = bio;

    // Parse FormData JSON strings
    if (experiences) {
      aboutData.experiences = JSON.parse(experiences);
    }

    if (education) {
      aboutData.education = JSON.parse(education);
    }

    // Upload new image to Cloudinary
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "portfolio/about",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });

      console.log("CLOUDINARY RESULT:", uploadResult);

      aboutData.imageUrl = uploadResult.secure_url;
    }

    const updatedData = await aboutData.save();

    res.status(200).json({
      message: "About section updated successfully!",
      data: updatedData,
    });

  } catch (error) {
    console.error("UPDATE ABOUT ERROR:", error);

    res.status(500).json({
      error: "Server error while updating about data",
      details: error.message,
    });
  }
};


module.exports = {
  getAboutData,
  updateAboutData,
};