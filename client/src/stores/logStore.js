import { defineStore } from "pinia";

import service from "../services/logService";

export const useLogStore = defineStore("logs", {

    state: () => ({

        items: [],

        loading: false,
        clearing: false,

        search: "",
        module: ""

    }),

    getters: {

        filtered(state){

            let items = [...state.items];

            if(state.module){

                items = items.filter(

                    i => i.module === state.module

                );

            }

            if(state.search){

                const text =
                    state.search.toLowerCase();

                items = items.filter(item =>

                    item.username?.toLowerCase().includes(text) ||

                    item.module?.toLowerCase().includes(text) ||

                    item.action?.toLowerCase().includes(text) ||

                    item.target?.toLowerCase().includes(text)

                );

            }

            return items;

        },

        modules(state){

            return [...new Set(

                state.items.map(

                    i => i.module

                )

            )].sort();

        }

    },

    actions: {

        async load(){

            this.loading = true;

            try{

                const response =
                    await service.list();

                this.items =
                    response.data;

            }

            finally{

                this.loading = false;

            }

        }
    }

});