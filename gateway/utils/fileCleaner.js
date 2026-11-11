const fs = require("fs");
const path = require("path");

function deleteUpload(file) {

    if (!file)
        return;

    try {

        const filePath = path.join(

            __dirname,
            "..",
            file.replace(/^\/+/, "")

        );

        if (fs.existsSync(filePath)) {

            fs.unlinkSync(filePath);

        }

    }

    catch (err) {

        console.error(
            "Erro ao excluir arquivo:",
            file,
            err.message
        );

    }

}

module.exports = {

    deleteUpload

};