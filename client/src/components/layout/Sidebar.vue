<template>

<aside class="sidebar">

    <nav>

        <RouterLink
            v-for="item in menuPrincipal"
            :key="item.path"
            :to="item.path"
            class="sidebar-item"
            :class="{ active: route.path === item.path }"
        >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
        </RouterLink>

        <div class="sidebar-divider"></div>

        <RouterLink
            v-for="item in menuAdministracao"
            :key="item.path"
            :to="item.path"
            class="sidebar-item"
            :class="{ active: route.path === item.path }"
        >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
        </RouterLink>

    </nav>

    <div class="sidebar-footer">

        <button
            class="sidebar-item"
            @click="downloadBackup">

            <i class="bi bi-download"></i>

            <span>Exportar backup</span>

        </button>

        <button
            class="sidebar-item"
            @click="restoreBackup">

            <i class="bi bi-upload"></i>

            <span>Importar backup</span>

        </button>

        <button
            class="sidebar-item logout"
            @click="logout">

            <i class="bi bi-box-arrow-right"></i>

            <span>Sair</span>

        </button>

    </div>

</aside>

</template>

<script setup>

import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "../../stores/authStore";

import { downloadBackup, restoreBackup } from "../../services/backupService";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const menuPrincipal = [

    {
        label: "Dashboard",
        path: "/",
        icon: "bi bi-grid"
    },

    {
        label: "Conhecimento",
        path: "/knowledge",
        icon: "bi bi-book"
    }

];

const menuAdministracao = [

    {
        label: "Ferramentas",
        path: "/systems",
        icon: "bi bi-window"
    },

    {
        label:"Tutoriais",
        path:"/tutorials",
        icon:"bi bi-journal-bookmark"
    },

    {
        label:"Usuários",
        path:"/users",
        icon:"bi bi-people"
    },

    {
        label:"Logs",
        path:"/logs",
        icon:"bi bi-clock-history"
    }

];

async function logout(){

    await auth.logout();

    router.replace("/login");

}

</script>