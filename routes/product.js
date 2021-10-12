const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck, adminOrVendor } = require("../middlewares/auth");

// controller
const { Product } = require("../controllers");

// routes
router.post("/product", authCheck, adminOrVendor, Product.create);
router.get("/products/total", Product.productsCount);

router.get("/products/:count", Product.listAll); // products/100
router.delete("/product/:slug", authCheck, adminCheck, Product.remove);
router.get("/product/:slug", Product.read);
router.put("/product/:slug", authCheck, adminCheck, Product.update);

router.post("/products", Product.list);
// rating
router.put("/product/star/:productId", authCheck, Product.productStar);

// related products
router.get("/product/related/:productId", Product.listRelated);
// search
router.get("/product/search", Product.search);


module.exports = router;
