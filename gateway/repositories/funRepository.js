const db = require("../config/database").getDb();

function allItems() {

    return new Promise((resolve, reject) => {

        db.all(
            `
            SELECT *
            FROM fun_items
            ORDER BY sort_order,title
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

function getItem(id) {

    return new Promise((resolve, reject) => {

        db.get(
            `
            SELECT *
            FROM fun_items
            WHERE id=?
            `,
            [id],
            (err, row) => {

                if (err)
                    return reject(err);

                resolve(row);

            }
        );

    });

}

function createItem(data) {

    return new Promise((resolve, reject) => {

        db.run(
            `
            INSERT INTO fun_items(
                title,
                type,
                icon,
                description,
                sort_order,
                active
            )
            VALUES(?,?,?,?,?,?)
            `,
            [
                data.title,
                data.type,
                data.icon,
                data.description,
                data.sort_order,
                data.active
            ],
            function(err){

                if(err)
                    return reject(err);

                resolve(this.lastID);

            }
        );

    });

}

function updateItem(id,data){

    return new Promise((resolve,reject)=>{

        db.run(
            `
            UPDATE fun_items
            SET
                title=?,
                type=?,
                icon=?,
                description=?,
                sort_order=?,
                active=?,
                updated_at=CURRENT_TIMESTAMP
            WHERE id=?
            `,
            [
                data.title,
                data.type,
                data.icon,
                data.description,
                data.sort_order,
                data.active,
                id
            ],
            err=>{

                if(err)
                    return reject(err);

                resolve();

            }
        );

    });

}

function removeItem(id){

    return new Promise((resolve,reject)=>{

        db.run(
            "DELETE FROM fun_items WHERE id=?",
            [id],
            err=>{

                if(err)
                    return reject(err);

                resolve();

            }
        );

    });

}

function getEntries(itemId){

    return new Promise((resolve,reject)=>{

        db.all(
            `
            SELECT *
            FROM fun_entries
            WHERE item_id=?
            ORDER BY sort_order,id
            `,
            [itemId],
            (err,rows)=>{

                if(err)
                    return reject(err);

                resolve(rows);

            }
        );

    });

}

function getEntry(id){

    return new Promise((resolve,reject)=>{

        db.get(
            `
            SELECT *
            FROM fun_entries
            WHERE id=?
            `,
            [id],
            (err,row)=>{

                if(err)
                    return reject(err);

                resolve(row);

            }
        );

    });

}

function createEntry(itemId,data){

    return new Promise((resolve,reject)=>{

        db.run(
            `
            INSERT INTO fun_entries(
                item_id,
                text,
                file,
                sort_order
            )
            VALUES(?,?,?,?)
            `,
            [
                itemId,
                data.text,
                data.file,
                data.sort_order
            ],
            function(err){

                if(err)
                    return reject(err);

                resolve(this.lastID);

            }
        );

    });

}

function updateEntry(id,data){

    return new Promise((resolve,reject)=>{

        db.run(
            `
            UPDATE fun_entries
            SET
                text=?,
                file=?,
                sort_order=?
            WHERE id=?
            `,
            [
                data.text,
                data.file,
                data.sort_order,
                id
            ],
            err=>{

                if(err)
                    return reject(err);

                resolve();

            }
        );

    });

}

function removeEntry(id){

    return new Promise((resolve,reject)=>{

        db.run(
            "DELETE FROM fun_entries WHERE id=?",
            [id],
            err=>{

                if(err)
                    return reject(err);

                resolve();

            }
        );

    });

}

module.exports={

    allItems,
    getItem,
    createItem,
    updateItem,
    removeItem,

    getEntries,
    getEntry,
    createEntry,
    updateEntry,
    removeEntry

};