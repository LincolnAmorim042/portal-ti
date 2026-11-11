import { defineStore } from "pinia";
import { useCrud } from "../composables/useCrud";
import userService from "../services/userService";

export const useUserStore = defineStore("users", () =>
    useCrud({

        service: userService,

        searchableFields: [
            "username"
        ],

        sortableFields: [
            "username",
            "created_at",
            "last_login",
            "active"
        ],

        defaultSort: {
            field: "username",
            direction: "asc"
        },

        defaultPageSize: 15

    })
);