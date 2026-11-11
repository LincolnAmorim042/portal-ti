import api from "./api";

export default {

    async getAll(){

        const { data } = await api.get("/tutorials");

        return data;

    },

    async create(payload){

        const { data } = await api.post(

            "/tutorials",

            payload

        );

        return data;

    },

    async update(id,payload){

        const { data } = await api.put(

            `/tutorials/${id}`,

            payload

        );

        return data;

    },

    async remove(id){

        const { data } = await api.delete(

            `/tutorials/${id}`

        );

        return data;

    }

};