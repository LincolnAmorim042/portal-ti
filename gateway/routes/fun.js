const router = require("express").Router();

const controller =
    require("../controllers/funController");

const { verifyToken } =
    require("../middleware/auth");

const upload =
    require("../config/upload");

// =========================
// UPLOAD
// =========================

router.post(

    "/upload",

    verifyToken,

    upload.media.single("file"),

    controller.upload

);

// =========================
// ITENS
// =========================

router.get(
    "/",
    verifyToken,
    controller.getItems
);

router.get(
    "/:id",
    verifyToken,
    controller.getItem
);

router.post(
    "/",
    verifyToken,
    controller.createItem
);

router.put(
    "/:id",
    verifyToken,
    controller.updateItem
);

router.delete(
    "/:id",
    verifyToken,
    controller.removeItem
);

// =========================
// ENTRADAS
// =========================

router.get(
    "/:id/entries",
    verifyToken,
    controller.getEntries
);

router.post(
    "/:id/entries",
    verifyToken,
    controller.createEntry
);

router.put(
    "/:id/entries/:entryId",
    verifyToken,
    controller.updateEntry
);

router.delete(
    "/:id/entries/:entryId",
    verifyToken,
    controller.removeEntry
);

// =========================
// EXECUTAR
// =========================

router.post(
    "/:id/execute",
    verifyToken,
    controller.execute
);

module.exports = router;