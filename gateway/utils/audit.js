const logService =
    require("../services/logService");

async function log(
    req,
    module,
    action,
    target = ""
) {

    try {

        await logService.create({

            username:
                req.user?.username ||
                "Sistema",

            module,

            action,

            target,

            ip:
                req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
                req.socket?.remoteAddress ||
                ""

        });

    }

    catch (err) {

        console.error(
            "Erro ao registrar log:",
            err
        );

    }

}

module.exports = {

    log

};