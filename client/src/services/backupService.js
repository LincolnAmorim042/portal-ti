import api from "./api";

export async function downloadBackup() {

    try {

        const response = await api.get(

            "/backup",

            {

                responseType: "blob"

            }

        );

        const blob = response.data;

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        const disposition =
            response.headers["content-disposition"];

        let filename = "backup.db";

        if (disposition) {

            const match =
                disposition.match(/filename="?(.+?)"?$/);

            if (match)

                filename = match[1];

        }

        link.href = url;

        link.download = filename;

        link.click();

        URL.revokeObjectURL(url);

        alert(

            "Backup exportado com sucesso.\n\n" +

            "Salve o arquivo em:\n\n" +

            "Z:\\TI\\portal-ti-backups"

        );

    }

    catch {

        alert("Erro ao gerar backup.");

    }

}

export async function restoreBackup() {

    const input = document.createElement("input");

    input.type = "file";

    input.accept = ".db";

    input.onchange = async () => {

        if (!input.files.length)
            return;

        if (

            !confirm(

                "O banco de dados atual será substituído. Deseja continuar?"

            )

        )
            return;

        const form = new FormData();

        form.append(

            "backup",

            input.files[0]

        );

        try {

            await api.post(

                "/backup/restore",

                form,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    }

                }

            );

            alert("Backup restaurado com sucesso.");

            location.reload();

        }

        catch {

            alert("Erro ao restaurar backup.");

        }

    };

    input.click();

}