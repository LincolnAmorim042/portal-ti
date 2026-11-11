const repository = require("../repositories/systemRepository");
const audit = require("../utils/audit");
const authService = require("../services/authService");

// =========================
// LISTAR
// =========================
async function list(req,res){

    try{

        const systems=await repository.getSystems();

        res.json(systems);

    }

    catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

}

// =========================
// BUSCAR
// =========================
async function get(req,res){

    try{

        const system=await repository.getSystem(req.params.id);

        if(!system){

            return res.status(404).json({

                success:false,
                message:"Ferramenta não encontrada."

            });

        }

        res.json(system);

    }

    catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

}

// =========================
// NOVO
// =========================
async function create(req,res){

    try{

        const id=await repository.createSystem(req.body);

        await audit.log(

            req,

            "Ferramentas",

            "Criou",

            req.body.name

        );

        res.json({

            success:true,
            id

        });

    }

    catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

}

// =========================
// ALTERAR
// =========================
async function update(req,res){

    try{

        await repository.updateSystem(

            req.params.id,
            req.body

        );

        await audit.log(

            req,

            "Ferramentas",

            "Editou",

            req.body.name

        );

        res.json({

            success:true

        });

    }

    catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

}

// =========================
// REMOVER
// =========================
async function remove(req,res){

    try{

        await repository.deleteSystem(req.params.id);

        await audit.log(

            req,

            "Ferramentas",

            "Excluiu",

            system.name

        );

        res.json({

            success:true

        });

    }

    catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

}

// =========================
// ABRIR
// =========================
async function open(req,res){

    try{

        const system =
            await repository.getSystem(req.params.id);

        if(!system){

            return res.status(404).json({

                success:false,
                message:"Ferramenta não encontrada."

            });

        }

        await audit.log(

            req,

            "Ferramentas",

            "Acessou",

            system.name

        );

        const response = {

            success:true,

            url:system.url,

            launch_mode:system.launch_mode

        };

        if(system.launch_mode==="portal-sso"){

            return res.json({
                success: true,
                url: `/apps/${system.id}`
            });

        } else {

            response.url = system.url;

        }

        res.json(response);

    }

    catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

}

module.exports={

    list,
    get,
    create,
    update,
    remove,
    open

};