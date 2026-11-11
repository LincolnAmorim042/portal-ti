const service = require("../services/funService");
const audit = require("../utils/audit");

// =========================
// ITENS
// =========================

async function getItems(req, res) {

    res.json(
        await service.getItems()
    );

}

async function getItem(req, res) {

    const item = await service.getItem(req.params.id);

    if (!item)
        return res.sendStatus(404);

    res.json(item);

}

async function createItem(req, res) {

    const id = await service.createItem(
        req.body
    );

    await audit.log(

        req,

        "Laboratório",

        "Criou botão",

        req.body.title

    );

    res.json({
        success: true,
        id
    });

}

async function updateItem(req, res) {

    await service.updateItem(
        req.params.id,
        req.body
    );

    await audit.log(

        req,

        "Laboratório",

        "Editou botão",

        req.body.title

    );

    res.json({
        success: true
    });

}

async function removeItem(req, res) {

    await service.removeItem(
        req.params.id
    );
    
    await audit.log(

        req,

        "Laboratório",

        "Excluiu botão",

        req.params.id

    );

    res.json({
        success: true
    });

}

// =========================
// ENTRADAS
// =========================

async function getEntries(req, res) {

    res.json(
        await service.getEntries(
            req.params.id
        )
    );

}

async function createEntry(req, res) {

    const id = await service.createEntry(
        req.params.id,
        req.body
    );

    const item = await service.getItem(req.params.id);

    await audit.log(

        req,

        "Laboratório",

        "Criou entrada",

        item.title

    );

    res.json({
        success: true,
        id
    });

}

async function updateEntry(req, res) {

    await service.updateEntry(
        req.params.entryId,
        req.body
    );
    const item = await service.getItem(req.params.id);

    await audit.log(

        req,

        "Laboratório",

        "Editou entrada",

        item.title

    );

    res.json({
        success: true
    });

}

async function removeEntry(req, res) {

    await service.removeEntry(
        req.params.entryId
    );
    const item = await service.getItem(req.params.id);

    await audit.log(

        req,

        "Laboratório",

        "Excluiu entrada",

        item.title

    );

    res.json({
        success: true
    });

}

async function upload(req, res) {

    if (!req.file) {

        return res.status(400).json({

            success: false,

            message: "Arquivo não enviado."

        });

    }

    const folder = req.file.mimetype.startsWith("image/")
        ? "images"
        : "audio";

    await audit.log(

        req,

        "Laboratório",

        "Upload",

        req.file.originalname

    );

    res.json({

        success: true,

        path: `/uploads/${folder}/${req.file.filename}`

    });

}

// =========================
// EXECUTAR
// =========================

async function execute(req, res) {

    const result = await service.execute(
        req.params.id
    );

    if (!result)
        return res.sendStatus(404);

    res.json(result);

}

module.exports = {

    getItems,
    getItem,
    createItem,
    updateItem,
    removeItem,

    getEntries,
    createEntry,
    updateEntry,
    removeEntry,
    upload,
    execute

};