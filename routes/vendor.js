const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, vendorCheck } = require("../middlewares/auth");
// controllers 
const { Order, Product } = require("../controllers");

// //add new user account
router.get("/vendor/products", authCheck, vendorCheck, Product.listByVendor);
router.get("/vendor/orders", authCheck, vendorCheck, Order.ordersByVendor);

router.patch("/vendor/order/:orderId", authCheck, vendorCheck, Order.updateStatus);

module.exports = router;