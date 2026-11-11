<template>

<BaseModal

    v-model="store.entryModal"

    :title="store.selectedEntry ? 'Editar entrada' : 'Nova entrada'"

>

    <EntryForm

        ref="form"

        :model-value="store.selectedEntry"

    />

    <template #footer>

        <BaseButton

            variant="secondary"

            @click="store.closeEntry()"

        >

            Cancelar

        </BaseButton>

        <BaseButton

            :loading="store.saving"

            @click="save"

        >

            Salvar

        </BaseButton>

    </template>

</BaseModal>

</template>

<script setup>

import { ref } from "vue";

import BaseModal from "../base/BaseModal.vue";
import BaseButton from "../base/BaseButton.vue";

import EntryForm from "./EntryForm.vue";

import { useFunStore } from "../../stores/funStore";

const store = useFunStore();

const form = ref();

async function save(){

    await form.value.validate();

}

</script>