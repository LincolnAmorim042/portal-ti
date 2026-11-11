import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "../stores/authStore";

import DefaultLayout from "../layouts/DefaultLayout.vue";

import Dashboard from "../pages/Dashboard.vue";
import Users from "../pages/Users.vue";
import Systems from "../pages/Systems.vue";
import Logs from "../pages/Logs.vue";
import Login from "../pages/Login.vue";
import Tutorials from "../pages/Tutorials.vue";
import Knowledge from "../pages/Knowledge.vue";
import Fun from "../pages/Fun.vue";
import FunAdmin from "../pages/FunAdmin.vue";

const router = createRouter({

    history: createWebHistory(),

    routes: [

        {
            path: "/login",
            component: Login,
            meta: {
                public: true
            }
        },

        {
            path: "/",
            component: DefaultLayout,

            children: [

                {
                    path: "",
                    component: Dashboard
                },

                {
                    path: "knowledge",
                    component: Knowledge
                },

                {
                    path: "systems",
                    component: Systems,
                    meta: {
                        admin: true
                    }
                },
                
                {
                    path:"tutorials",
                    component:Tutorials
                },

                {
                    path: "users",
                    component: Users,
                    meta: {
                        admin: true
                    }
                },

                {
                    path: "logs",
                    component: Logs
                },

                {
                    path: "fun",
                    component: Fun
                },

                {
                    path: "fun-admin",
                    component: FunAdmin
                }
            ]

        }

    ]

});

router.beforeEach(async (to) => {

    const auth = useAuthStore();

    await auth.initialize();

    if (to.meta.public) {

        if (auth.authenticated) {

            return "/";

        }

        return true;

    }

    if (!auth.authenticated) {

        return "/login";

    }

    if (to.meta.admin && !auth.isAdmin) {

        return "/";

    }

    return true;

});

export default router;