const express=require("express");

const router=express.Router();

const controller=require("../controllers/systemController");

const {verifyToken, requireAdmin}=require("../middleware/auth");

router.get(
    "/",
    verifyToken,
    controller.list
);

router.get(
    "/:id",
    verifyToken,
    controller.get
);

router.post(
    "/",
    verifyToken,
    requireAdmin,
    controller.create
);

router.put(
    "/:id",
    verifyToken,
    requireAdmin,
    controller.update
);

router.delete(
    "/:id",
    verifyToken,
    requireAdmin,
    controller.remove
);

router.post(
    "/:id/open",
    verifyToken,
    controller.open
);

module.exports=router;