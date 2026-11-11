import api from "./api";

export default {

    async login(username, password) {

        const { data } = await api.post("/login", {

            username,
            password

        });

        return data;

    },

    async logout() {

        const { data } = await api.post("/logout");

        return data;

    },

    async me() {

        const { data } = await api.get("/me");

        return data.data;

    }

};