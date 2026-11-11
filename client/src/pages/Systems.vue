<template>

<BasePage

    title="Ferramentas"

    description="Gerenciamento das ferramentas disponíveis no Portal TI"

    icon="bi bi-grid"

    :loading="store.loading"

    :empty="store.filteredItems.length===0"

>

    <template #filters>

        <BaseInput

            label="Pesquisar"

            placeholder="Pesquisar ferramenta..."

            v-model="store.search"

        />

    </template>

    <template #actions>

        <BaseButton

            icon="bi bi-plus"

            @click="store.openCreate()"

        >

            Nova ferramenta

        </BaseButton>

    </template>

    <BaseTable

        :columns="columns"

        :rows="store.filteredItems"

        :sort="store.sortState"

        @sort="store.sort"

    >

        <template #icon="{row}">

            <i
                :class="row.icon || 'bi bi-grid'"
                style="font-size:20px"
            />

        </template>

        <template #actions="{row}">

            <BaseButton

                icon="bi bi-box-arrow-up-right"

                variant="primary"

                @click="store.open(row)"

            >

                Abrir

            </BaseButton>

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

    <SystemModal />

    <DeleteSystemModal />

</BasePage>

</template>

<script setup>

import { onMounted } from "vue";

import BasePage from "../components/base/BasePage.vue";
import BaseInput from "../components/base/BaseInput.vue";
import BaseButton from "../components/base/BaseButton.vue";
import BaseTable from "../components/base/BaseTable.vue";

import SystemModal from "../components/systems/SystemModal.vue";
import DeleteSystemModal from "../components/systems/DeleteSystemModal.vue";

import { useSystemStore } from "../stores/systemStore";

const store = useSystemStore();

const columns=[

    {
        field:"icon",
        label:"",
        slot:"icon",
        width:"70px"
    },

    {
        field:"name",
        label:"Ferramenta",
        sortable:true
    },

    {
        field:"category",
        label:"Categoria",
        sortable:true,
        width:"180px"
    },

    {
        field:"url",
        label:"Endereço"
    },

    {
        field:"sort_order",
        label:"Ordem",
        sortable:true,
        width:"90px",
        align:"center"
    },

    {
        field:"active",
        label:"Status",
        sortable:true,
        width:"120px",
        align:"center",
        type:"badge",
        formatter:value=>value?"Ativo":"Inativo",
        badge:value=>value?"success":"danger"
    }

];

onMounted(()=>{

    store.load();

});

</script>