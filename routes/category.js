const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { Category } = require("../controllers");

// routes
router.get("/categories", Category.list);
router.get("/category/sub", Category.listSub);
router.get("/category/:slug", Category.getCategory);
router.get("/category/sub/:slug", Category.fetchSub);
//requires admin permission
router.post("/category", authCheck, adminCheck, Category.create);
router.post("/category/sub", authCheck, adminCheck, Category.createSub);
router.patch("/category/:slug", authCheck, adminCheck, Category.update);
router.patch("/category/sub/:slug", authCheck, adminCheck, Category.updateSub);
router.delete("/category/:slug", authCheck, adminCheck, Category.remove);
router.delete("/category/sub/:slug", authCheck, adminCheck, Category.removeSub);

module.exports = router;
