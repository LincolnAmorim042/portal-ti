const service =
    require("../services/logService");

async function list(req, res) {

    res.json(

        await service.list()

    );

}

async function clear(req, res) {

    await service.clear();

    res.json({

        success: true

    });

}

module.exports = {

    list,
    clear

};