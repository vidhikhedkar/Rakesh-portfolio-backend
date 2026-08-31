// routes/profile.routes.js
const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const upload = require('../middleware/upload');

router.get('/', getProfile);

router.put('/', upload.single('avatar'), updateProfile);

module.exports = router;