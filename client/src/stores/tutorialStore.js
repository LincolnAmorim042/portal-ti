import { defineStore } from "pinia";

import { useCrud } from "../composables/useCrud";

import tutorialService from "../services/tutorialService";

export const useTutorialStore = defineStore(

    "tutorials",

    () => {

        return {

            ...useCrud({

                service: tutorialService,

                searchableFields: [

                    "title",

                    "category",

                    "description"

                ],

                sortableFields: [

                    "title",

                    "category",

                    "sort_order",

                    "active"

                ],

                defaultSort:{

                    field:"category",

                    direction:"asc"

                },

                defaultPageSize:15

            })

        };

    }

);