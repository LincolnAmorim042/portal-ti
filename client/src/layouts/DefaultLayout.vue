<template>

<div class="app-layout">

    <AppHeader/>

    <div class="portal">

        <Sidebar/>

        <main class="content">

            <RouterView/>

        </main>

    </div>

</div>

</template>

<script setup>

import { RouterView } from "vue-router";

import AppHeader from "../components/layout/AppHeader.vue";
import Sidebar from "../components/layout/Sidebar.vue";

</script>