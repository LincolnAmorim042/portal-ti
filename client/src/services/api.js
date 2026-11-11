import axios from "axios";

import router from "../router";
import { useAuthStore } from "../stores/authStore";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

let redirectingToLogin = false;

api.interceptors.response.use(
    response => response,

    async error => {
        if (error.response?.status === 401) {
            const auth = useAuthStore();

            auth.user = null;
            auth.initialized = false;

            if (!redirectingToLogin && router.currentRoute.value.path !== "/login") {
                redirectingToLogin = true;

                await router.replace("/login");

                redirectingToLogin = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;