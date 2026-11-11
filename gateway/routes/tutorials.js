const router = require("express").Router();

const controller =
    require("../controllers/tutorialController");

const { verifyToken,requireAdmin } =
    require("../middleware/auth");

router.get(

    "/",

    verifyToken,

    controller.getAll

);

router.post(

    "/",

    verifyToken,

    controller.create

);

router.put(

    "/:id",

    verifyToken,

    controller.update

);

router.delete(

    "/:id",

    verifyToken,
    requireAdmin,

    controller.remove

);

module.exports = router;