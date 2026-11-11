<template>

<BaseTable

    :columns="columns"

    :rows="store.entries"

>

    <template #content="{ row }">

        <span v-if="store.selected?.type==='text'">

            {{ preview(row.text) }}

        </span>

        <span v-else>

            {{ filename(row.file) }}

        </span>

    </template>

    <template #actions="{ row }">

        <div class="table-actions">

            <BaseButton

                size="sm"

                variant="secondary"

                @click="store.openEditEntry(row)"

            >

                Editar

            </BaseButton>

            <BaseButton

                size="sm"

                variant="danger"

                @click="store.openDeleteEntry(row)"

            >

                Excluir

            </BaseButton>

        </div>

    </template>

</BaseTable>

</template>

<script setup>

import BaseTable from "../base/BaseTable.vue";
import BaseButton from "../base/BaseButton.vue";

import { useFunStore } from "../../stores/funStore";

const store = useFunStore();

const columns = [

    {

        field: "content",

        label: "Conteúdo",

        type: "slot"

    },

    {

        field: "sort_order",

        label: "Ordem",

        width: "120px"

    }

];

function preview(text){

    if(!text)
        return "";

    if(text.length <= 70)
        return text;

    return text.substring(0,70) + "...";

}

function filename(file){

    if(!file)
        return "";

    return file.split("/").pop();

}

</script>