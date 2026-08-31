const express = require('express');
const router = express.Router();
const { getHomeContent, updateHomeContent } = require('../controllers/homeController');
const upload = require('../middleware/upload');

router.get('/', getHomeContent);
router.put('/', upload.single('image'), updateHomeContent);

module.exports = router;