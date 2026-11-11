<template>

<BaseTable

    :columns="columns"

    :rows="store.items"

>

    <template #icon="{ row }">

        <i

            :class="row.icon"

            style="font-size:22px"

        />

    </template>

    <template #actions="{ row }">

        <div class="table-actions">

            <BaseButton

                size="sm"

                variant="secondary"

                @click="store.openEdit(row)"

            >

                Editar

            </BaseButton>

            <BaseButton

                size="sm"

                variant="danger"

                @click="store.openDelete(row)"

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

        field:"icon",

        label:"Ícone",

        width:"70px",

        type:"slot"

    },

    {

        field:"title",

        label:"Título"

    },

    {

        field:"type",

        label:"Tipo",

        formatter:value=>({

            text:"Texto",

            image:"Imagem",

            audio:"Áudio"

        }[value])

    },

    {

        field:"entries",

        label:"Entradas"

    },

    {

        field:"active",

        label:"Status",

        formatter:value=>value ? "Ativo" : "Inativo"

    }

];

</script>