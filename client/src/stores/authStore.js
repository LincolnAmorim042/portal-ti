import { defineStore } from "pinia";
import authService from "../services/authService";

export const useAuthStore = defineStore("auth", {

    state: () => ({

        user: null,

        initialized: false,

        loading: false

    }),

    getters: {

        authenticated(state) {

            return state.user !== null;

        },

        isAdmin(state) {

            return state.user?.role === "admin";

        }

    },

    actions: {

        async initialize() {

            if (this.initialized) {

                return;

            }

            this.loading = true;

            try {

                this.user = await authService.me();

            }

            catch {

                this.user = null;

                this.initialized = false;

            }

            finally {

                this.loading = false;

                this.initialized = true;

            }

        },

        async login(username, password) {

            this.loading = true;

            try {

                await authService.login(

                    username,

                    password

                );

                this.user = await authService.me();

            }

            finally {

                this.loading = false;

            }

        },

        async logout() {

            try {

                await authService.logout();

            }

            finally {

                this.user = null;

                this.initialized = false;

            }

        }

    }

});