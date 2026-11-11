const db = require("../config/database").getDb();

function all(){

    return new Promise((resolve,reject)=>{

        db.all(

            `
            SELECT *
            FROM tutorials
            ORDER BY category,sort_order,title
            `,

            [],

            (err,rows)=>{

                if(err)
                    return reject(err);

                resolve(rows);

            }

        );

    });

}

function get(id){

    return new Promise((resolve,reject)=>{

        db.get(
            `
            SELECT *
            FROM tutorials
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

function create(data){

    return new Promise((resolve,reject)=>{

        db.run(

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

                data.title,
                data.category,
                data.description,
                data.type,
                data.content,
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

function update(id,data){

    return new Promise((resolve,reject)=>{

        db.run(

            `
            UPDATE tutorials
            SET

                title=?,
                category=?,
                description=?,
                type=?,
                content=?,
                sort_order=?,
                active=?,
                updated_at=CURRENT_TIMESTAMP

            WHERE id=?
            `,

            [

                data.title,
                data.category,
                data.description,
                data.type,
                data.content,
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

function remove(id){

    return new Promise((resolve,reject)=>{

        db.run(

            "DELETE FROM tutorials WHERE id=?",

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

    all,
    get,
    create,
    update,
    remove

};