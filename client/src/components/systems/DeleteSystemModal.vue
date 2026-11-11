<template>

<BaseModal
    v-model="store.deleteModal"
    title="Excluir ferramenta"
>

    <p>

        Deseja realmente excluir

        <strong>

            {{store.selected?.name}}

        </strong>

        ?

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

import { useSystemStore } from "../../stores/systemStore";

const store=useSystemStore();

</script>