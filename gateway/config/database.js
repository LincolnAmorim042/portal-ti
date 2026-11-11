const sqlite3 = require("sqlite3").verbose();

const path = require("path");

const databasePath = path.join(
    __dirname,
    "../database/data/gateway.db"
);

let db = null;

function open() {

    if (db)
        return db;

    db = new sqlite3.Database(

        databasePath,

        err => {

            if (err) {

                console.error(err);

            }

        }

    );

    db.serialize(() => {

        db.run("PRAGMA foreign_keys = ON");

        db.run("PRAGMA journal_mode = WAL");

    });

    return db;

}

function getDb() {

    if (!db)
        open();

    return db;

}

function close() {

    return new Promise((resolve, reject) => {

        if (!db)
            return resolve();

        db.close(err => {

            if (err)
                return reject(err);

            db = null;

            resolve();

        });

    });

}

module.exports = {

    getDb,

    open,

    close,

    databasePath

};