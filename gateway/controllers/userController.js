const repository = require("../repositories/userRepository");
const {ok, fail} = require("../utils/http.js");
const audit = require("../utils/audit");

// =========================
// LISTAR
// =========================
async function list(req, res) {

    try {

        const users = await repository.getUsers();

        ok(res, users);

    } catch (err) {

        fail(res, 500, err.message);

    }

}

// =========================
// BUSCAR
// =========================
async function get(req, res) {

    try {

        const user = await repository.getUser(req.params.id);

        if (!user) {
            return fail(res, 404, "Usuário não encontrado.");
        }

        ok(res, user);

    } catch (err) {

        fail(res, 500, err.message);

    }

}

// =========================
// CRIAR
// =========================
async function create(req, res) {

    try {

        const { username, password, active } = req.body;

        if (!username?.trim()) {
            return fail(res, 400, "Informe o usuário.");
        }

        if (!password?.trim()) {
            return fail(res, 400, "Informe a senha.");
        }

        const exists = await repository.findByUsername(username);

        if (exists) {
            return fail(res, 409, "Usuário já existe.");
        }

        const id = await repository.createUser(
            username,
            password,
            active
        );

        await audit.log(

            req,

            "Usuários",

            "Criou",

            req.body.username

        );

        ok(res, { id }, 201);

    } catch (err) {

        fail(res, 500, err.message);

    }

}

// =========================
// ALTERAR
// =========================
async function update(req, res) {

    try {

        const user = await repository.getUser(req.params.id);

        if (!user) {
            return fail(res, 404, "Usuário não encontrado.");
        }

        const { username, active } = req.body;

        if (!username?.trim()) {
            return fail(res, 400, "Informe o usuário.");
        }

        const exists = await repository.findByUsername(username);

        if (exists && exists.id != req.params.id) {
            return fail(
                res,
                409,
                "Já existe outro usuário com esse login."
            );
        }

        await repository.updateUser(
            req.params.id,
            username,
            null,
            active
        );

        await audit.log(

            req,

            "Usuários",

            "Editou",

            req.body.username

        );

        ok(res);

    } catch (err) {

        fail(res, 500, err.message);

    }

}

// =========================
// ALTERAR SENHA
// =========================
async function changePassword(req, res) {

    try {

        const user = await repository.getUser(req.params.id);

        if (!user) {
            return fail(res, 404, "Usuário não encontrado.");
        }

        const { password } = req.body;

        if (!password?.trim()) {
            return fail(res, 400, "Informe a senha.");
        }

        await repository.updatePassword(
            req.params.id,
            password
        );

        await audit.log(

            req,

            "Usuários",

            "Alterou senha",

            user.username

        );

        ok(res);

    } catch (err) {

        fail(res, 500, err.message);

    }

}

// =========================
// REMOVER
// =========================
async function remove(req, res) {

    try {

        const user = await repository.getUser(req.params.id);

        if (!user) {
            return fail(res, 404, "Usuário não encontrado.");
        }

        if (user.id === req.user.id) {
            return fail(
                res,
                400,
                "Você não pode excluir seu próprio usuário."
            );
        }

        await repository.deleteUser(req.params.id);

        await audit.log(

            req,

            "Usuários",

            "Excluiu",

            user.username

        );

        ok(res);

    } catch (err) {

        fail(res, 500, err.message);

    }

}

module.exports = {
    list,
    get,
    create,
    update,
    changePassword,
    remove
};