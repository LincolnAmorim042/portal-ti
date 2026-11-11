const fs = require("fs");
const os = require("os");
const path = require("path");

const { ZipArchive } = require("archiver");

const unzipper = require("unzipper");

const database = require("../config/database");
const migrate = require("../database/migrate");

// =========================
// Caminhos
// =========================

const uploadsPath = path.join(
    __dirname,
    "../uploads"
);

const imagesPath = path.join(
    uploadsPath,
    "images"
);

const audioPath = path.join(
    uploadsPath,
    "audio"
);

// =========================
// Timestamp
// =========================

function timestamp() {

    const d = new Date();

    const pad = n =>
        String(n).padStart(2, "0");

    return (
        d.getFullYear()
        + "-"
        + pad(d.getMonth() + 1)
        + "-"
        + pad(d.getDate())
        + "_"
        + pad(d.getHours())
        + "-"
        + pad(d.getMinutes())
        + "-"
        + pad(d.getSeconds())
    );

}

// =========================
// Remove pasta inteira
// =========================

function removeDirectory(directory) {

    if (!fs.existsSync(directory))
        return;

    fs.rmSync(
        directory,
        {
            recursive: true,
            force: true
        }
    );

}

// =========================
// Garante pasta
// =========================

function ensureDirectory(directory) {

    fs.mkdirSync(
        directory,
        {
            recursive: true
        }
    );

}

// =========================
// Compacta diretório
// =========================

function zipDirectory(source, destination) {

    return new Promise((resolve, reject) => {

        const output =
            fs.createWriteStream(destination);

        const archive =
            new ZipArchive("zip", {

                zlib: {
                    level: 9
                }

            });

        output.on(
            "close",
            resolve
        );

        output.on(
            "error",
            reject
        );

        archive.on(
            "error",
            reject
        );

        archive.pipe(output);

        archive.directory(
            source,
            false
        );

        archive.finalize();

    });

}

// =========================
// Extrai ZIP
// =========================

function unzip(file, destination) {

    return new Promise((resolve, reject) => {

        fs.createReadStream(file)

            .pipe(

                unzipper.Extract({

                    path: destination

                })

            )

            .on(
                "close",
                resolve
            )

            .on(
                "error",
                reject
            );

    });

}

// =========================
// Criar backup
// =========================

async function createBackup() {

    const filename =
        `portal-ti_${timestamp()}.zip`;

    const zipFile =
        path.join(
            os.tmpdir(),
            filename
        );

    const workdir =
        fs.mkdtempSync(
            path.join(
                os.tmpdir(),
                "portal-ti-"
            )
        );

    try {

        //
        // Fecha SQLite para copiar
        //

        await database.close();

        //
        // Banco
        //

        fs.copyFileSync(

            database.databasePath,

            path.join(
                workdir,
                "gateway.db"
            )

        );

        //
        // Reabre imediatamente
        //

        database.open();

        //
        // Uploads
        //

        if (fs.existsSync(uploadsPath)) {

            fs.cpSync(

                uploadsPath,

                path.join(
                    workdir,
                    "uploads"
                ),

                {
                    recursive: true
                }

            );

        }

        //
        // Compacta
        //

        await zipDirectory(

            workdir,

            zipFile

        );

        return {

            filename,

            file: zipFile

        };

    }

    finally {

        removeDirectory(workdir);

    }

}

// =========================
// Restaurar backup
// =========================

async function restoreBackup(file) {

    const extractDir =
        fs.mkdtempSync(

            path.join(
                os.tmpdir(),
                "portal-ti-restore-"
            )

        );

    try {

        //
        // Extrai o ZIP
        //

        await unzip(

            file,

            extractDir

        );

        //
        // Verifica se existe banco
        //

        const backupDatabase = path.join(

            extractDir,

            "gateway.db"

        );

        if (!fs.existsSync(backupDatabase)) {

            throw new Error(

                "Backup inválido. gateway.db não encontrado."

            );

        }

        //
        // Fecha banco
        //

        await database.close();

        //
        // Remove WAL/SHM
        //

        const databaseFile =
            database.databasePath;

        const wal =
            databaseFile + "-wal";

        const shm =
            databaseFile + "-shm";

        if (fs.existsSync(wal))
            fs.unlinkSync(wal);

        if (fs.existsSync(shm))
            fs.unlinkSync(shm);

        //
        // Restaura banco
        //

        fs.copyFileSync(

            backupDatabase,

            databaseFile

        );

        //
        // Reabre banco
        //

        database.open();

        //
        // Atualiza migrations
        //

        await migrate();

        //
        // Uploads
        //

        const backupUploads = path.join(
            extractDir,
            "uploads"
        );

        if (fs.existsSync(backupUploads)) {

            const uploadsBackup = path.join(

                os.tmpdir(),

                "portal-ti-uploads-backup-" + Date.now()

            );

            try {

                //
                // Salva os uploads atuais
                //

                if (fs.existsSync(uploadsPath)) {

                    fs.cpSync(

                        uploadsPath,

                        uploadsBackup,

                        {

                            recursive: true

                        }

                    );

                }

                //
                // Remove uploads atuais
                //

                removeDirectory(imagesPath);
                removeDirectory(audioPath);

                ensureDirectory(imagesPath);
                ensureDirectory(audioPath);

                //
                // Copia imagens
                //

                const backupImages = path.join(

                    backupUploads,

                    "images"

                );

                if (fs.existsSync(backupImages)) {

                    fs.cpSync(

                        backupImages,

                        imagesPath,

                        {

                            recursive: true

                        }

                    );

                }

                //
                // Copia áudios
                //

                const backupAudio = path.join(

                    backupUploads,

                    "audio"

                );

                if (fs.existsSync(backupAudio)) {

                    fs.cpSync(

                        backupAudio,

                        audioPath,

                        {

                            recursive: true

                        }

                    );

                }

                //
                // Tudo OK
                //

                removeDirectory(uploadsBackup);

            }

            catch (err) {

                //
                // Restaura uploads antigos
                //

                removeDirectory(imagesPath);
                removeDirectory(audioPath);

                ensureDirectory(imagesPath);
                ensureDirectory(audioPath);

                if (fs.existsSync(uploadsBackup)) {

                    const oldImages = path.join(
                        uploadsBackup,
                        "images"
                    );

                    const oldAudio = path.join(
                        uploadsBackup,
                        "audio"
                    );

                    if (fs.existsSync(oldImages)) {

                        fs.cpSync(

                            oldImages,

                            imagesPath,

                            {

                                recursive: true

                            }

                        );

                    }

                    if (fs.existsSync(oldAudio)) {

                        fs.cpSync(

                            oldAudio,

                            audioPath,

                            {

                                recursive: true

                            }

                        );

                    }

                    removeDirectory(uploadsBackup);

                }

                throw err;

            }

        }

    }

    finally {

        removeDirectory(

            extractDir

        );

    }

}

module.exports = {

    createBackup,

    restoreBackup

};