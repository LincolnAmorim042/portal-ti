import api from "./api";

function list() {

    return api.get("/logs");

}

export default {

    list

};