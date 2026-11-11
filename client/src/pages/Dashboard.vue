<template>

<BasePage
    title="Dashboard"
    description="Ferramentas disponíveis"
>

    <template #filters>

        <BaseInput

            v-model="search"

            icon="bi bi-search"

            placeholder="Pesquisar ferramenta..."

        />

    </template>

    <div

        v-for="group in grouped"

        :key="group.name"

        class="system-group"

    >

        <h2>

            {{ group.name }}

        </h2>

        <div class="system-grid">

            <SystemCard

                v-for="system in group.items"

                :key="system.id"

                :system="system"

            />

        </div>

    </div>

</BasePage>

</template>

<script setup>

import {

    ref,

    computed,

    onMounted

} from "vue";

import BasePage from "../components/base/BasePage.vue";
import BaseInput from "../components/base/BaseInput.vue";
import SystemCard from "../components/systems/SystemCard.vue";

import { useSystemStore } from "../stores/systemStore";

const store = useSystemStore();

const search = ref("");

onMounted(() => {

    store.load();

});

const filtered = computed(() => {

    const term = search.value
        .trim()
        .toLowerCase();

    if (!term)
        return store.items ?? [];

    return (store.items ?? []).filter(system => {

        return [

            system.name,

            system.description,

            system.category

        ]

        .filter(Boolean)

        .some(value =>

            value.toLowerCase().includes(term)

        );

    });

});

const grouped = computed(() => {

    const map = {};

    filtered.value.forEach(system => {

        const category = system.category || "Outros";

        if (!map[category]) {

            map[category] = [];

        }

        map[category].push(system);

    });

    return Object.entries(map).map(

        ([name, items]) => ({

            name,

            items

        })

    );

});

</script>