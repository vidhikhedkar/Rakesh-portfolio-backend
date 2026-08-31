const Contact = require('../models/Contact');

// Get contact details (Typically a singleton document or first record)
exports.getContact = async (req, res) => {
    try {
        let contact = await Contact.findOne();
        if (!contact) {
            // Provide default initial data if none exists
            contact = await Contact.create({
                email: "rakeshparvathneni26@gmail.com",
                phone1: "+91 96406 57114",
                phone2: "+91 81860 54115",
                city: "Hyderabad",
                state: "Telangana, India",
                websiteUrl: "#",
                twitterUrl: "#",
                instagramUrl: "#"
            });
        }
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update or create contact details
exports.updateContact = async (req, res) => {
    try {
        const { email, phone1, phone2, city, state, websiteUrl, twitterUrl, instagramUrl } = req.body;

        // Find the first document or create it if it doesn't exist (Upsert pattern for single-record settings)
        let contact = await Contact.findOne();

        if (contact) {
            contact.email = email || contact.email;
            contact.phone1 = phone1 || contact.phone1;
            contact.phone2 = phone2 || contact.phone2;
            contact.city = city || contact.city;
            contact.state = state || contact.state;
            contact.websiteUrl = websiteUrl;
            contact.twitterUrl = twitterUrl;
            contact.instagramUrl = instagramUrl;

            await contact.save();
        } else {
            contact = await Contact.create({
                email,
                phone1,
                phone2,
                city,
                state,
                websiteUrl,
                twitterUrl,
                instagramUrl
            });
        }

        res.status(200).json({ success: true, message: "Contact details updated successfully", data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};