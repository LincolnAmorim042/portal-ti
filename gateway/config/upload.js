const fs = require("fs");
const path = require("path");

const multer = require("multer");

// =========================
// Pastas permanentes
// =========================

const uploadRoot =
    path.join(__dirname, "../uploads");

const imagePath =
    path.join(uploadRoot, "images");

const audioPath =
    path.join(uploadRoot, "audio");

fs.mkdirSync(imagePath, {

    recursive: true

});

fs.mkdirSync(audioPath, {

    recursive: true

});

// =========================
// Upload temporário
// (Backup Restore)
// =========================

const temp = multer({

    dest: "/tmp"

});

// =========================
// Upload permanente
// (Memes / Arquivos)
// =========================

const storage = multer.diskStorage({

    destination(req, file, cb) {

        if (file.mimetype.startsWith("image/")) {

            return cb(

                null,

                imagePath

            );

        }

        if (file.mimetype.startsWith("audio/")) {

            return cb(

                null,

                audioPath

            );

        }

        cb(

            new Error("Tipo de arquivo não suportado.")

        );

    },

    filename(req, file, cb) {

        const ext =
            path.extname(file.originalname);

        const name =
            Date.now() +
            "_" +
            Math.random()
                .toString(36)
                .substring(2, 8) +
            ext;

        cb(

            null,

            name

        );

    }

});

const media = multer({

    storage,

    limits: {

        fileSize: 25 * 1024 * 1024

    }

});

module.exports = {

    temp,
    media

};