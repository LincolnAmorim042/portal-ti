const fs = require("fs");

const backupService =
    require("../services/backupService");

const audit =
    require("../utils/audit");

async function download(req, res) {

    try {

        const backup =
            await backupService.createBackup();
        
        await audit.log(

            req,

            "Backup",

            "Download",

            backup.filename

        );

        res.download(

            backup.file,

            backup.filename,

            () => {

                fs.rm(

                    backup.file,

                    {
                        force: true
                    },

                    () => {}

                );

            }

        );

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            error: "Erro ao gerar backup."

        });

    }

}

async function restore(req, res) {

    if (!req.file) {

        return res.status(400).json({

            error: "Arquivo não enviado."

        });

    }

    try {

        await backupService.restoreBackup(

            req.file.path

        );

        res.json({

            success: true

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            error: "Erro ao restaurar backup."

        });

    }

    finally {

        fs.unlink(

            req.file.path,

            () => {}

        );

    }

}

module.exports = {

    download,
    restore

};