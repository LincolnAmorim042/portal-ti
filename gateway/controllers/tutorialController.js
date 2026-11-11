const service=require("../services/tutorialService");
const audit = require("../utils/audit");

async function getAll(req,res){

    res.json(

        await service.getAll()

    );

}

async function create(req,res){

    await service.create(req.body);
    await audit.log(

        req,

        "Conhecimento",

        "Criou",

        req.body.title

    );
    res.json({success:true});

}

async function update(req,res){

    await service.update(

        req.params.id,

        req.body

    );
    await audit.log(

        req,

        "Conhecimento",

        "Editou",

        req.body.title

    );
    res.json({success:true});

}

async function remove(req,res){

    const tutorial =
        await service.get(req.params.id);

    await service.remove(
        req.params.id
    );

    await audit.log(

        req,

        "Conhecimento",

        "Excluiu",

        tutorial?.title || req.params.id

    );

    res.json({

        success:true

    });

}

module.exports={

    getAll,
    create,
    update,
    remove

};