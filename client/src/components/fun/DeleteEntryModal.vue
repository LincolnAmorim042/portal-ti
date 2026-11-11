<template>

<BaseModal

    v-model="store.deleteEntryModal"
    title="Excluir entrada"

>

    <p>

        Deseja realmente excluir esta entrada?

    </p>

    <template #footer>

        <BaseButton

            variant="secondary"

            @click="store.closeDeleteEntry()"

        >

            Cancelar

        </BaseButton>

        <BaseButton

            variant="danger"

            :loading="store.saving"

            @click="store.confirmDeleteEntry()"

        >

            Excluir

        </BaseButton>

    </template>

</BaseModal>

</template>

<script setup>

import BaseModal from "../base/BaseModal.vue";
import BaseButton from "../base/BaseButton.vue";

import { useFunStore } from "../../stores/funStore";

const store = useFunStore();

</script>