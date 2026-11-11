<template>

<BasePage

    title="Laboratório"

    description="Gerenciamento dos botões do laboratório."

    icon="bi bi-flask"

    :loading="store.loading"

    :empty="store.items.length===0"

    empty-message="Nenhum botão cadastrado."

>

    <template #actions>

        <BaseButton

            icon="bi bi-plus-lg"

            @click="store.openCreate()"

        >

            Novo botão

        </BaseButton>

    </template>

    <!-- Botões -->

    <FunTable/>

    <!-- Entradas -->

    <div

        v-if="store.selected"

        class="entries-section"

    >

        <div class="entries-header">

            <h3>

                Entradas -

                {{ store.selected.title }}

            </h3>

            <BaseButton

                icon="bi bi-plus-lg"

                @click="store.openCreateEntry()"

            >

                Nova entrada

            </BaseButton>

        </div>

        <EntryTable/>

    </div>

</BasePage>

<FunModal/>

<EntryModal/>

<DeleteFunModal/>

<DeleteEntryModal/>

</template>

<script setup>

import { onMounted } from "vue";

import BasePage from "../components/base/BasePage.vue";
import BaseButton from "../components/base/BaseButton.vue";

import FunTable from "../components/fun/FunTable.vue";
import EntryTable from "../components/fun/EntryTable.vue";

import FunModal from "../components/fun/FunModal.vue";
import EntryModal from "../components/fun/EntryModal.vue";

import DeleteFunModal from "../components/fun/DeleteFunModal.vue";
import DeleteEntryModal from "../components/fun/DeleteEntryModal.vue";

import { useFunStore } from "../stores/funStore";

const store = useFunStore();

onMounted(async()=>{

    await store.load();

});

</script>