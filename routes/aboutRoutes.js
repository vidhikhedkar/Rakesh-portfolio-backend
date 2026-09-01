const express = require("express");
const router = express.Router();
const {getAboutData,updateAboutData} = require("../controllers/aboutController");
const upload = require("../middleware/upload");

router.get("/", getAboutData);
router.put("/", upload.single("image"), updateAboutData);

module.exports = router;