const database = require("../config/database");



// =========================
// LISTAR
// =========================
function getSystems() {
    const db = database.getDb();

    return new Promise((resolve, reject) => {

        db.all(
            `
            SELECT
                id,
                name,
                description,
                url,
                icon,
                category,
                launch_mode,
                sort_order,
                active,
                created_at,
                updated_at
            FROM systems
            ORDER BY
                category,
                sort_order,
                name
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
// BUSCAR
// =========================
function getSystem(id) {
    const db = database.getDb();

    return new Promise((resolve, reject) => {

        db.get(
            `
            SELECT *
            FROM systems
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
// NOVO
// =========================
function createSystem(system) {

    const db = database.getDb();

    return new Promise((resolve, reject) => {

        db.run(
            `
            INSERT INTO systems
            (
                name,
                description,
                url,
                icon,
                category,
                launch_mode,
                sort_order,
                active
            )
            VALUES
            (
                ?,?,?,?,?,?,?,?
            )
            `,
            [
                system.name,
                system.description,
                system.url,
                system.icon,
                system.category,
                system.launch_mode,
                system.sort_order,
                system.active
            ],
            function(err){

                if(err) return reject(err);

                resolve(this.lastID);

            }

        );

    });

}

// =========================
// ALTERAR
// =========================
function updateSystem(id, system){
    const db = database.getDb();

    return new Promise((resolve,reject)=>{

        db.run(
            `
            UPDATE systems
            SET
                name=?,
                description=?,
                url=?,
                icon=?,
                category=?,
                launch_mode=?,
                sort_order=?,
                active=?,
                updated_at=CURRENT_TIMESTAMP
            WHERE id=?
            `,
            [
                system.name,
                system.description,
                system.url,
                system.icon,
                system.category,
                system.launch_mode,
                system.sort_order,
                system.active,
                id
            ],
            err=>{

                if(err) return reject(err);

                resolve();

            }

        );

    });

}

// =========================
// REMOVER
// =========================
function deleteSystem(id){
    const db = database.getDb();

    return new Promise((resolve,reject)=>{

        db.run(
            `
            DELETE FROM systems
            WHERE id=?
            `,
            [id],
            err=>{

                if(err) return reject(err);

                resolve();

            }

        );

    });

}

module.exports={

    getSystems,
    getSystem,
    createSystem,
    updateSystem,
    deleteSystem

};