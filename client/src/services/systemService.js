import api from "./api";

function openRedirect(url) {
    window.location.href = url;
}

function openTab(url) {
    window.open(url, "_blank");
}

function openPopup(url) {
    window.open(
        url,
        "_blank",
        "width=1200,height=800"
    );
}

export default {

    async getAll() {

        const { data } = await api.get("/systems");

        return data || [];

    },

    async get(id) {

        const { data } = await api.get(`/systems/${id}`);

        return data;

    },

    async create(system) {

        const { data } = await api.post(
            "/systems",
            system
        );

        return data;

    },

    async update(id, system) {

        const { data } = await api.put(
            `/systems/${id}`,
            system
        );

        return data;

    },

    async remove(id) {

        const { data } = await api.delete(
            `/systems/${id}`
        );

        return data;

    },

    async launch(id) {

        const { data } = await api.post(
            `/systems/${id}/open`
        );

        switch (data.launch_mode) {

            case "same_tab":

                openRedirect(data.url);
                break;

            case "popup":

                openPopup(data.url);
                break;

            case "portal-sso":

                openRedirect(data.url);
                break;

            default:

                openTab(data.url);

        }

    }

};