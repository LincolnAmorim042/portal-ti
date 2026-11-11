const {
    verifyPortalToken
} = require("../services/authService");

const TOKEN_COOKIE = "token";

function verifyToken(req, res, next) {

    const token = req.cookies?.[TOKEN_COOKIE];

    if (!token) {
        return handleUnauthenticated(req, res);
    }

    try {

        req.user = verifyPortalToken(token);

        next();

    } catch {

        res.clearCookie(TOKEN_COOKIE);

        return handleUnauthenticated(req, res);
    }
}

function requireAdmin(req, res, next) {

    if (!req.user) {
        return handleUnauthenticated(req, res);
    }

    if (req.user.role !== "admin") {

        if (req.originalUrl.startsWith("/api/")) {

            return res.status(403).json({
                success: false,
                message: "Acesso negado."
            });

        }

        return res.status(403).send("Acesso negado.");

    }

    next();
}

function handleUnauthenticated(req, res) {

    if (req.originalUrl.startsWith("/api/")) {

        return res.status(401).json({
            success: false,
            message: "Não autenticado."
        });

    }

    return res.redirect("/");
}

module.exports = {
    verifyToken,
    requireAdmin,
    TOKEN_COOKIE
};