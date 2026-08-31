const express = require('express');
const router = express.Router();
const {
    getServices,
    updateServices,
    deleteService
} = require('../controllers/serviceOfferingController');

// Routes mapping
router.route('/')
    .get(getServices)
    .put(updateServices);

router.route('/:id')
    .delete(deleteService);

module.exports = router;