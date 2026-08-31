const express = require('express');
const router = express.Router();
const { getContact, updateContact } = require('../controllers/contactController');

router.route('/').get(getContact).put(updateContact);

module.exports = router;