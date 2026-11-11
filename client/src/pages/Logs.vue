<template>

<BasePage

    title="Logs"

    description="Histórico de ações realizadas"

    icon="bi bi-clock-history"

    :loading="store.loading"

    :empty="store.filtered.length===0"

    empty-message="Nenhum registro encontrado."

>

    <template #filters>

        <BaseInput

            v-model="store.search"

            icon="bi bi-search"

            placeholder="Pesquisar..."

        />

        <BaseSelect

            v-model="store.module"

            placeholder="Todos os módulos"

            :options="[

                {

                    label:'Todos',

                    value:''

                },

                ...store.modules.map(m=>({

                    label:m,

                    value:m

                }))

            ]"

        />

    </template>

    <LogTable/>

</BasePage>

</template>

<script setup>

import { onMounted } from "vue";

import BasePage from "../components/base/BasePage.vue";
import BaseInput from "../components/base/BaseInput.vue";
import BaseSelect from "../components/base/BaseSelect.vue";

import LogTable from "../components/logs/LogTable.vue";

import { useLogStore } from "../stores/logStore";

const store = useLogStore();

onMounted(()=>{

    store.load();

});

</script>