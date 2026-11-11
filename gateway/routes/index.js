const express = require("express");

const appsRoutes = require("./apps");
const authRoutes = require("./auth");
const userRoutes = require("./users");
const systemRoutes = require("./systems");
const backupRoutes =  require("./backups");
const tutorialRoutes = require("./tutorials");
const funRoutes = require("./fun");
const logs = require("./logs");

const router = express.Router();

router.use("/apps", appsRoutes);

router.use(authRoutes);
router.use("/backup", backupRoutes);
router.use("/tutorials", tutorialRoutes);
router.use("/users", userRoutes);
router.use("/fun", funRoutes);
router.use("/systems", systemRoutes);
router.use("/logs", logs);

module.exports = router;