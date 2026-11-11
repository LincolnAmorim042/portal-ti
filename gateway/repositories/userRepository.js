const database = require("../config/database");

const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

// =========================
// LISTAR
// =========================
function getUsers() {
    const db = database.getDb();

    return new Promise((resolve, reject) => {

        db.all(
            `
            SELECT
                id,
                username,
                active,
                last_login,
                created_at
            FROM users
            ORDER BY username
            `,
            [],
            (err, rows) => {

                if (err) return reject(err);

                resolve(rows);

            }
        );

    });

}

// =========================
// BUSCAR POR ID
// =========================
function getUser(id) {
    const db = database.getDb();

    return new Promise((resolve, reject) => {

        db.get(
            `
            SELECT
                id,
                username,
                active,
                last_login,
                created_at
            FROM users
            WHERE id=?
            `,
            [id],
            (err, row) => {

                if (err) return reject(err);

                resolve(row);

            }
        );

    });

}

// =========================
// BUSCAR LOGIN
// =========================
function findByUsername(username) {
    const db = database.getDb();

    return new Promise((resolve, reject) => {

        db.get(
            `
            SELECT *
            FROM users
            WHERE username=?
            `,
            [username],
            (err, row) => {

                if (err) return reject(err);

                resolve(row);

            }
        );

    });

}

// =========================
// NOVO
// =========================
async function createUser(username, password, active = 1) {
    const db = database.getDb();

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    return new Promise((resolve, reject) => {

        db.run(
            `
            INSERT INTO users
            (
                username,
                password,
                active
            )
            VALUES
            (
                ?,?,?
            )
            `,
            [
                username,
                hash,
                active
            ],
            function (err) {

                if (err) return reject(err);

                resolve(this.lastID);

            }

        );

    });

}

// =========================
// ALTERAR
// =========================
async function updateUser(id, username, password, active) {
    const db = database.getDb();
    
    if (password) {

        const hash = await bcrypt.hash(password, SALT_ROUNDS);

        return new Promise((resolve, reject) => {

            db.run(
                `
                UPDATE users
                SET
                    username=?,
                    password=?,
                    active=?
                WHERE id=?
                `,
                [
                    username,
                    hash,
                    active,
                    id
                ],
                err => {

                    if (err) return reject(err);

                    resolve();

                }

            );

        });

    }

    return new Promise((resolve, reject) => {

        db.run(
            `
            UPDATE users
            SET
                username=?,
                active=?
            WHERE id=?
            `,
            [
                username,
                active,
                id
            ],
            err => {

                if (err) return reject(err);

                resolve();

            }

        );

    });

}

// =========================
// REMOVER
// =========================
function deleteUser(id) {
    const db = database.getDb();

    return new Promise((resolve, reject) => {

        db.run(
            `
            DELETE FROM users
            WHERE id=?
            `,
            [id],
            err => {

                if (err) return reject(err);

                resolve();

            }

        );

    });

}

// =========================
// SENHA
// =========================
async function comparePassword(password, hash) {
    const db = database.getDb();

    return bcrypt.compare(password, hash);

}

async function updatePassword(id, password) {
    const db = database.getDb();

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    return new Promise((resolve, reject) => {

        db.run(
            `
            UPDATE users
            SET password=?
            WHERE id=?
            `,
            [
                hash,
                id
            ],
            err => {

                if (err) {
                    return reject(err);
                }

                resolve();

            }
        );

    });

}

function updateLastLogin(id) {
    const db = database.getDb();
    
    return new Promise((resolve, reject) => {

        db.run(
            `
            UPDATE users
            SET last_login=CURRENT_TIMESTAMP
            WHERE id=?
            `,
            [id],
            err => {

                if (err) return reject(err);

                resolve();

            }

        );

    });

}

module.exports = {

    getUsers,
    getUser,
    findByUsername,
    createUser,
    updateUser,
    deleteUser,
    comparePassword,
    updatePassword,
    updateLastLogin
};