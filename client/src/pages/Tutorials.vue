<template>

<BasePage

    title="Tutoriais"

    description="Base de conhecimento da TI"

    icon="bi bi-journal-bookmark"

    :loading="store.loading"

    :empty="store.filteredItems.length===0"

>

    <template #filters>

        <BaseInput

            label="Pesquisar"

            placeholder="Pesquisar..."

            v-model="store.search"

        />

    </template>

    <template #actions>

        <BaseButton

            icon="bi bi-plus"

            @click="store.openCreate()"

        >

            Novo tutorial

        </BaseButton>

    </template>

    <BaseTable

        :columns="columns"

        :rows="store.filteredItems"

        :sort="store.sortState"

        @sort="store.sort"

    >

        <template #actions="{row}">

            <BaseButton

                icon="bi bi-pencil"

                variant="secondary"

                @click="store.openEdit(row)"

            />

            <BaseButton

                icon="bi bi-trash"

                variant="danger"

                @click="store.openDelete(row)"

            />

        </template>

    </BaseTable>

    <TutorialModal/>

    <DeleteTutorialModal/>

</BasePage>

</template>

<script setup>

import { onMounted } from "vue";

import BasePage from "../components/base/BasePage.vue";
import BaseInput from "../components/base/BaseInput.vue";
import BaseButton from "../components/base/BaseButton.vue";
import BaseTable from "../components/base/BaseTable.vue";

import TutorialModal from "../components/tutorials/TutorialModal.vue";
import DeleteTutorialModal from "../components/tutorials/DeleteTutorialModal.vue";

import { useTutorialStore } from "../stores/tutorialStore";

const store=useTutorialStore();

const columns=[

    {

        field:"title",

        label:"Título",

        sortable:true

    },

    {

        field:"category",

        label:"Categoria",

        sortable:true,

        width:"180px"

    },

    {

        field:"type",

        label:"Tipo",

        width:"120px"

    },

    {

        field:"sort_order",

        label:"Ordem",

        sortable:true,

        width:"90px"

    },

    {

        field:"active",

        label:"Status",

        sortable:true,

        width:"120px",

        type:"badge",

        formatter:v=>v?"Ativo":"Inativo",

        badge:v=>v?"success":"danger"

    }

];

onMounted(()=>{

    store.load();

});

</script>