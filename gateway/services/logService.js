const repository =
    require("../repositories/logRepository");

async function list() {

    return repository.all();

}

async function create(data) {

    return repository.insert(data);

    await repository.deleteOlderThan(90); //days


}

module.exports = {

    list,
    create
};