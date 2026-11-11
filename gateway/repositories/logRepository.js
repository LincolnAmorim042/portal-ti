const db = require("../config/database").getDb();

function all() {

    return new Promise((resolve, reject) => {

        db.all(
            `
            SELECT *
            FROM logs
            ORDER BY datetime(created_at) DESC, id DESC
            `,
            [],
            (err, rows) => {

                if (err)
                    return reject(err);

                resolve(rows);

            }
        );

    });

}

function insert(data) {

    return new Promise((resolve, reject) => {

        db.run(
            `
            INSERT INTO logs(
                username,
                module,
                action,
                target,
                ip
            )
            VALUES(?,?,?,?,?)
            `,
            [
                data.username,
                data.module,
                data.action,
                data.target,
                data.ip
            ],
            function(err) {

                if (err)
                    return reject(err);

                resolve(this.lastID);

            }
        );

    });

}

function deleteOlderThan(days){

    return new Promise((resolve,reject)=>{

        db.run(
            `
            DELETE FROM logs
            WHERE created_at <
                datetime('now', ?)
            `,
            [`-${days} days`],
            err=>{

                if(err)
                    return reject(err);

                resolve();

            }
        );

    });

}

module.exports = {

    all,
    insert,
    deleteOlderThan

};