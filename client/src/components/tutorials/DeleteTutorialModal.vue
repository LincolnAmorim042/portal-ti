<template>

<BaseModal
    v-model="store.deleteModal"
    title="Excluir tutorial"
>

    <p>
        Deseja realmente excluir
        <strong>{{ store.selected?.title }}</strong>?
    </p>

    <template #footer>

        <BaseButton
            variant="secondary"
            @click="store.closeDelete()"
        >
            Cancelar
        </BaseButton>

        <BaseButton
            variant="danger"
            @click="store.confirmDelete()"
        >
            Excluir
        </BaseButton>

    </template>

</BaseModal>

</template>

<script setup>

import BaseModal from "../base/BaseModal.vue";
import BaseButton from "../base/BaseButton.vue";

import { useTutorialStore } from "../../stores/tutorialStore";

const store = useTutorialStore();

</script>