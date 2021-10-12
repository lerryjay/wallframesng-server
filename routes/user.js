const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, subscriberOrVendor } = require("../middlewares/auth");
const { User, Cart, Order, Wishlist } = require("../controllers");


// Cart
router.post("/user/cart", authCheck, subscriberOrVendor, Cart.userCart); // save cart
router.get("/user/cart", authCheck, subscriberOrVendor, Cart.getUserCart); // get cart
router.delete("/user/cart", authCheck, subscriberOrVendor, Cart.emptyCart); // empty cart
router.patch("/user/address", authCheck, subscriberOrVendor, User.saveAddress);

// Orders
router.post("/user/order", authCheck, subscriberOrVendor, Order.create); // interswitch payment 
router.post("/user/cash-order", authCheck, subscriberOrVendor, Order.createCashOrder); // cod
router.get("/user/orders", authCheck, subscriberOrVendor, Order.ordersByUser);

// coupon
router.patch("/user/cart/coupon", authCheck, subscriberOrVendor, Cart.applyCouponToUserCart);

// wishlist
router.post("/user/wishlist", authCheck, subscriberOrVendor, Wishlist.addToWishlist);
router.get("/user/wishlist", authCheck, subscriberOrVendor, Wishlist.wishlist);
router.delete("/user/wishlist/:productId", authCheck, subscriberOrVendor, Wishlist.removeFromWishlist);


module.exports = router;
