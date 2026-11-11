require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const migrate = require("./database/migrate");
const routes = require("./routes");
const appsRoutes = require("./routes/apps");

const app = express();

// =========================
// Inicialização
// =========================

(async () => {

    try {

        await migrate();

        console.log("Banco inicializado.");

    } catch (err) {

        console.error(err);
        process.exit(1);

    }

})();

// =========================
// Middlewares
// =========================

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(cookieParser());


// =========================
// Apps
// =========================

app.use(
    "/apps",
    appsRoutes
);


// =========================
// JSON do Gateway
// =========================

app.use(express.json());


// =========================
// API
// =========================

app.use(
    "/api",
    routes
);


// =========================
// Uploads
// =========================

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


// =========================
// Frontend Vue
// =========================

app.use(
    express.static(
        path.join(__dirname, "../client/dist")
    )
);


// =========================
// Vue Router
// =========================

app.get("*", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "../client/dist/index.html"
        )
    );

});


// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Gateway iniciado na porta ${PORT}`
    );

});