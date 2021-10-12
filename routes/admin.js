const express = require("express");
const { auth } = require("../firebase");

const router = express.Router();

// middlewares
const { authCheck, adminCheck, } = require("../middlewares/auth")
const { Order, Product, Vendor, Auth, Admin } = require("../controllers");

// routes
router.get("/admin/orders", authCheck, adminCheck, Order.ordersByAdmin);
router.patch("/admin/order/:OrderId", authCheck, adminCheck, Order.updateStatus);

router.post("/product", authCheck, adminCheck, Product.create);


router.get("/admin/vendors", authCheck, adminCheck, Vendor.list);


router.post("/admin", authCheck, adminCheck, Auth.createAdmin);
router.get("/admin", authCheck, adminCheck, Admin.list);
module.exports = router;
