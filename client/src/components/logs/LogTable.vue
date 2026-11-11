<template>

<BaseTable

    :columns="columns"

    :rows="store.filtered"

>

    <template #module="{ row }">

        <span

            class="badge"

            :class="badge(row.module)"

        >

            {{ row.module }}

        </span>

    </template>

</BaseTable>

</template>

<script setup>

import BaseTable from "../base/BaseTable.vue";

import { useLogStore } from "../../stores/logStore";

const store = useLogStore();

const columns = [

    {

        field:"created_at",

        label:"Data/Hora",

        type:"datetime",

        width:"170px"

    },

    {

        field:"username",

        label:"Usuário",

        width:"150px"

    },

    {

        field:"module",

        label:"Módulo",

        type:"slot",

        width:"140px"

    },

    {

        field:"action",

        label:"Ação"

    },

    {

        field:"target",

        label:"Alvo"

    }

];

function badge(module){

    return{

        Backup:"badge-primary",

        Ferramentas:"badge-success",

        Conhecimento:"badge-warning",

        Laboratório:"badge-danger",

        Usuários:"badge-info"

    }[module] || "badge-secondary";

}

</script>