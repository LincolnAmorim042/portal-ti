import api from "./api";

function unwrap(response) {

    return response.data.data;

}

export default {

    async getAll() {

        return unwrap(await api.get("/users"));

    },

    async get(id) {

        return unwrap(await api.get(`/users/${id}`));

    },

    async create(user) {

        return unwrap(await api.post("/users", user));

    },

    async update(id, user) {

        return unwrap(await api.put(`/users/${id}`, user));

    },

    async remove(id) {

        return unwrap(await api.delete(`/users/${id}`));

    }

};