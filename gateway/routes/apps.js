const express = require("express");

const repository = require("../repositories/systemRepository");
const { verifyToken } = require("../middleware/auth");

const {
    apiProxy,
    frontendProxy
} = require("../middleware/appsProxy");

const router = express.Router();

router.use(
    "/:id",
    verifyToken,
    async (req, res, next) => {

        try {

            const system =
                await repository.getSystem(
                    req.params.id
                );

            if (!system) {

                return res.status(404).json({

                    success: false,

                    message: "Sistema não encontrado."

                });

            }

            if (!system.active) {

                return res.status(403).json({

                    success: false,

                    message: "Sistema desativado."

                });

            }

            if (
                system.launch_mode !==
                "portal-sso"
            ) {

                return res.status(403).json({

                    success: false,

                    message:
                        "Este sistema não utiliza acesso interno."

                });

            }

            try {

                const target =
                    new URL(system.url);

                if (
                    !["http:", "https:"]
                        .includes(target.protocol)
                ) {

                    return res.status(400).json({

                        success: false,

                        message:
                            "URL do sistema inválida."

                    });

                }

            } catch {

                return res.status(400).json({

                    success: false,

                    message:
                        "URL do sistema inválida."

                });

            }

            req.system = system;


            next();

        } catch (err) {

            console.error(
                "Erro ao preparar sistema:",
                err
            );

            return res.status(502).json({

                success: false,

                message:
                    "Não foi possível acessar o sistema."

            });
        }
    }
);

router.use(
    "/:id/api",
    apiProxy
);

router.use(
    "/:id",
    frontendProxy
);


module.exports = router;