import api from "./api";

// =========================
// ITENS
// =========================

function getItems() {

    return api.get("/fun");

}

function getItem(id) {

    return api.get(`/fun/${id}`);

}

function createItem(data) {

    return api.post("/fun", data);

}

function updateItem(id, data) {

    return api.put(`/fun/${id}`, data);

}

function removeItem(id) {

    return api.delete(`/fun/${id}`);

}

// =========================
// ENTRADAS
// =========================

function getEntries(id) {

    return api.get(`/fun/${id}/entries`);

}

function createEntry(id, data) {

    return api.post(`/fun/${id}/entries`, data);

}

function updateEntry(id, entryId, data) {

    return api.put(

        `/fun/${id}/entries/${entryId}`,

        data

    );

}

function removeEntry(id, entryId) {

    return api.delete(

        `/fun/${id}/entries/${entryId}`

    );

}

// =========================
// EXECUTAR
// =========================

function execute(id) {

    return api.post(

        `/fun/${id}/execute`

    );

}

// =========================
// UPLOAD
// =========================

async function upload(file) {

    const form = new FormData();

    form.append(

        "file",

        file

    );

    const response = await api.post(

        "/fun/upload",

        form,

        {

            headers: {

                "Content-Type":

                    "multipart/form-data"

            }

        }

    );

    return response.data.path;

}

export default {

    getItems,
    getItem,
    createItem,
    updateItem,
    removeItem,

    getEntries,
    createEntry,
    updateEntry,
    removeEntry,

    execute,
    upload

};