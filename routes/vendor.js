const express = require("express");
const { auth } = require("../firebase");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

const { createVendor } = require("../controllers/vendor");

// routes for admin accounts
//add new user account
// router.post("/vendor", createVendor );


// routes for orders by admin

module.exports = router;