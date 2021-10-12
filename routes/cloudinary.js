const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck, adminOrVendor } = require("../middlewares/auth");

// controllers
const { upload, remove } = require("../controllers/cloudinary");

router.post("/uploadimages", authCheck, adminOrVendor, upload);
router.post("/removeimage", authCheck, adminOrVendor, remove);

module.exports = router;
