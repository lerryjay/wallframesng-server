const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck, vendorCheck } = require("../middlewares/auth");

// controller
const { createOrUpdateUser, currentUser, createVendor, createUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, currentUser);
router.post("/current-user", authCheck,);
router.post("/current-admin", authCheck, adminCheck, currentUser);
router.post("/current-vendor", authCheck, vendorCheck, currentUser);


// router.post("/user/login", authCheck, loginUser);
router.post("/user/register", authCheck, createUser);


// router.post("/vendor/login", authCheck, loginVendor);
router.post("/vendor/register", authCheck, createVendor);


// router.post("/admin/login", authCheck, loginAdmin);
// router.post("/admin/register", authCheck, adminCheck, createAdmin);
module.exports = router;