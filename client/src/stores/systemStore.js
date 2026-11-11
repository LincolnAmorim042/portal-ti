import { defineStore } from "pinia";
import { watch } from "vue";

import { useCrud } from "../composables/useCrud";
import systemService from "../services/systemService";

export const useSystemStore = defineStore(

    "systems",

    () => {

        const crud = useCrud({

            service: systemService,

            searchableFields: [

                "name",
                "description",
                "category"

            ],

            sortableFields: [

                "name",
                "category",
                "sort_order",
                "active"

            ],

            defaultSort: {

                field:"category",
                direction:"asc"

            },

            defaultPageSize:15

        });

        watch(

            crud.search,

            () => {

                crud.page.value = 1;

            }

        );

        return {

            ...crud

        };

    }

);