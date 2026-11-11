<template>

<BaseModal
    v-model="store.deleteModal"
    title="Excluir botão"
>

    <p>

        Deseja realmente excluir

        <strong>

            {{ store.selected?.title }}

        </strong>

        ?

    </p>

    <p
        class="warning"
    >

        Todas as entradas vinculadas também serão removidas.

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

            :loading="store.saving"

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

import { useFunStore } from "../../stores/funStore";

const store = useFunStore();

</script>