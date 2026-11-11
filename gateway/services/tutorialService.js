const repository=require("../repositories/tutorialRepository");

module.exports={

    getAll:()=>repository.all(),

    get:async (id)=>{return repository.get(id);},

    create:data=>repository.create(data),

    update:(id,data)=>repository.update(id,data),

    remove:id=>repository.remove(id)

};