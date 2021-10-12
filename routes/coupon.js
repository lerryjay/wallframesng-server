const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { Coupon } = require("../controllers");

// routes
router.post("/coupon", authCheck, adminCheck, Coupon.create);
router.get("/coupons", Coupon.list);
router.delete("/coupon/:couponId", authCheck, adminCheck, Coupon.remove);

module.exports = router;
