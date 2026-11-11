const bcrypt = require("bcrypt");

const database = require("../config/database");

function run(db, sql, params = []) {

    return new Promise((resolve, reject) => {

        db.run(sql, params, err => {

            if (err)
                return reject(err);

            resolve();

        });

    });

}

function get(db, sql, params = []) {

    return new Promise((resolve, reject) => {

        db.get(sql, params, (err, row) => {

            if (err)
                return reject(err);

            resolve(row);

        });

    });

}

async function migrate() {

    const db = database.getDb();

    await run(db, `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user',
            active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_login DATETIME,
            created_by TEXT,
            updated_by TEXT,
            updated_at DATETIME
        )
    `);

    await run(db, `
        CREATE TABLE IF NOT EXISTS systems (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            url TEXT NOT NULL,
            description TEXT,
            icon TEXT,
            category TEXT,
            launch_mode TEXT DEFAULT 'redirect',
            sort_order INTEGER DEFAULT 0,
            active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME,
            created_by TEXT,
            updated_by TEXT
        )
    `);

    await run(db, `
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            module TEXT,
            action TEXT,
            target TEXT,
            ip TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    await run(db, `
        CREATE TABLE IF NOT EXISTS settings (
            id INTEGER PRIMARY KEY,
            portal_name TEXT,
            logo TEXT,
            session_hours INTEGER DEFAULT 8
        )
    `);

    await run(db, `
        CREATE TABLE IF NOT EXISTS tutorials (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT,
            description TEXT,
            type TEXT NOT NULL DEFAULT 'text',
            content TEXT,
            sort_order INTEGER DEFAULT 0,
            active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME,
            created_by TEXT,
            updated_by TEXT
        )
    `);

    await run(db, `
        CREATE TABLE IF NOT EXISTS fun_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            type TEXT NOT NULL,
            icon TEXT,
            description TEXT,
            sort_order INTEGER DEFAULT 0,
            active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME,
            created_by TEXT,
            updated_by TEXT
        )
    `);

    await run(db, `
        CREATE TABLE IF NOT EXISTS fun_entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_id INTEGER NOT NULL,
            text TEXT,
            file TEXT,
            sort_order INTEGER DEFAULT 0,
            FOREIGN KEY(item_id)
                REFERENCES fun_items(id)
                ON DELETE CASCADE
        )
    `);

    // =========================
    // Usuário padrão
    // =========================

    const username =
        process.env.DEFAULT_USER || "placeholder";

    const password =
        process.env.DEFAULT_PASSWORD || "senha";

    const user = await get(
        db,
        "SELECT id FROM users WHERE username = ?",
        [username]
    );

    if (!user) {

        const hash = await bcrypt.hash(password, 10);

        await run(
            db,
            `
            INSERT INTO users(
                username,
                password,
                role
            )
            VALUES(?,?,?)
            `,
            [username, hash, "admin"]
        );
        console.log(`Usuário '${username}' criado.`);

    }

    // =========================
    // Configurações
    // =========================

    const settings = await get(
        db,
        "SELECT id FROM settings WHERE id = 1"
    );

    if (!settings) {

        await run(
            db,
            `
            INSERT INTO settings(
                id,
                portal_name,
                session_hours
            )
            VALUES(
                1,
                'Portal TI',
                8
            )
            `
        );

    }

    // =========================
    // Ferramenta padrão
    // =========================

    const defaultSystem = await get(
        db,
        "SELECT id FROM systems WHERE name = ?",
        ["Cancela Atendimento Tasy"]
    );

    if (!defaultSystem) {

        await run(
            db,
            `
            INSERT INTO systems(
                name,
                url,
                description,
                icon,
                category,
                launch_mode,
                sort_order,
                active
            )
            VALUES(?,?,?,?,?,?,?,?)
            `,
            [
                "Cancela Atendimento Tasy",
                "http://192.168.100.137:5004/",
                "Facilitador de cancelamento de atendimentos do Tasy",
                "bi bi-calendar2-x",
                "Tasy",
                "redirect",
                1,
                1
            ]
        );

        console.log("Ferramenta padrão criada.");

    }

    // =========================
    // Tutorial padrão
    // =========================

    const tutorial = await get(
        db,
        "SELECT id FROM tutorials LIMIT 1"
    );

    if (!tutorial) {

        await run(
            db,
            `
            INSERT INTO tutorials(
                title,
                category,
                description,
                type,
                content,
                sort_order,
                active
            )
            VALUES(?,?,?,?,?,?,?)
            `,
            [
                "Bem-vindo ao Portal TI",
                "Portal TI",
                "Conheça o funcionamento do Portal TI.",
                "text",
`Este portal centraliza as ferramentas utilizadas pela equipe de TI.

Módulos disponíveis:

• Dashboard
• Ferramentas
• Tutoriais
• Usuários
• Backup
• Laboratório

Utilize o menu lateral para navegar entre os módulos.

Sempre realize backup antes de alterações importantes.`,
                0,
                1
            ]
        );

        console.log("Tutorial padrão criado.");

    }

    // =========================
    // Meme padrão
    // =========================

    const forecast = await get(
        db,
        "SELECT id FROM fun_items WHERE title = ?",
        ["Previsão"]
    );

    if (!forecast) {

        await run(
            db,
            `
            INSERT INTO fun_items(
                title,
                type,
                icon,
                description,
                sort_order
            )
            VALUES(?,?,?,?,?)
            `,
            [
                "Previsão",
                "text",
                "bi bi-cloud-sun",
                "Previsão totalmente confiável.",
                0
            ]
        );

        const item = await get(
            db,
            "SELECT id FROM fun_items WHERE title = ?",
            ["Previsão"]
        );

        const phrases = [
            "Sol forte o dia todo ☀️",
            "Sol com algumas nuvens 🌤️",
            "Tempo parcialmente nublado ⛅",
            "Nublado o dia inteiro ☁️",
            "Pancadas de chuva 🌦️",
            "Chuva constante 🌧️",
            "Tempestade com raios ⛈️",
            "Trovoadas isoladas 🌩️",
            "Neblina pela manhã 🌫️",
            "Ventos fortes 🌬️",
            "Calor intenso 🥵",
            "Frio intenso 🥶",
            "Clima agradável 🌡️",
            "Possibilidade de arco-íris 🌈",
            "Chuva e sol (casamento de espanhol) 🌧️🌞",
            "Sol e chuva (casamento de viúva) 🌞🌧️"
        ];

        for (let i = 0; i < phrases.length; i++) {

            await run(
                db,
                `
                INSERT INTO fun_entries(
                    item_id,
                    text,
                    sort_order
                )
                VALUES(?,?,?)
                `,
                [
                    item.id,
                    phrases[i],
                    i
                ]
            );

        }

        console.log("Meme padrão criado.");

    }

}

module.exports = migrate;