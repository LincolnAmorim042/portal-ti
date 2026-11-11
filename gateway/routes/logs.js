const router = require("express").Router();

const controller =
    require("../controllers/logController");

const { verifyToken,requireAdmin } =
    require("../middleware/auth");

router.get(

    "/",

    verifyToken,

    controller.list

);

router.delete(

    "/",

    verifyToken,
    requireAdmin,

    controller.clear

);

module.exports = router;