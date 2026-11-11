const router = require("express").Router();

const controller =
    require("../controllers/backupController");

const { verifyToken,requireAdmin } =
    require("../middleware/auth");

const upload =
    require("../config/upload");

router.get(

    "/",

    verifyToken,
    requireAdmin,

    controller.download

);

router.post(

    "/restore",

    verifyToken,
    requireAdmin,

    upload.temp.single("backup"),

    controller.restore

);

module.exports = router;