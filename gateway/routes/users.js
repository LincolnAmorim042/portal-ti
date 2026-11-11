const express = require("express");

const router = express.Router();

const controller = require("../controllers/userController");
const { verifyToken,requireAdmin } = require("../middleware/auth");

router.use(verifyToken, requireAdmin);

router.get("/", controller.list);

router.get("/:id", controller.get);

router.post("/", controller.create);

router.put("/:id", controller.update);
    
router.put("/:id/password", controller.changePassword);

router.delete("/:id", controller.remove);

module.exports = router;