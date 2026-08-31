const ServiceOffering = require('../models/serviceOffering');


const getServices = async (req, res) => {
    try {
        const services = await ServiceOffering.find().sort({ num: 1 });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch services', details: error.message });
    }
};

// @desc    Update/Replace all service offerings
// @route   PUT /api/services
// @access  Admin
const updateServices = async (req, res) => {
    try {
        const { services } = req.body;

        if (!Array.isArray(services)) {
            return res.status(400).json({ error: 'Invalid payload. Expected an array of services.' });
        }

        // Clear existing collection records and insert fresh updated array
        await ServiceOffering.deleteMany({});
        const insertedServices = await ServiceOffering.insertMany(services);

        res.status(200).json({
            message: 'Services updated successfully',
            data: insertedServices
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update services', details: error.message });
    }
};


const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedService = await ServiceOffering.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ error: 'Service offering not found' });
        }

        res.status(200).json({
            message: 'Service deleted successfully',
            data: deletedService
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete service', details: error.message });
    }
};

module.exports = {
    getServices,
    updateServices,
    deleteService
};