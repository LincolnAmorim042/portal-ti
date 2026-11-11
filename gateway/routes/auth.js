const express = require("express");

const router = express.Router();

const controller = require("../controllers/authController");
const { verifyToken } = require("../middleware/auth");

router.post("/login", controller.login);

router.post("/logout", verifyToken, controller.logout);

router.get("/me", verifyToken, controller.me);

module.exports = router;