<template>

<BaseModal

    v-model="store.modal"

    :title="store.selected ? 'Editar botão' : 'Novo botão'"

    width="900px"

>

    <FunForm

        ref="form"

        :model-value="store.selected"

    />

    <hr class="modal-divider">

    <div

        v-if="store.selected"

        class="entries-header"

    >

        <h3>

            Entradas

        </h3>

        <BaseButton

            icon="bi bi-plus-lg"

            size="sm"

            @click="store.openCreateEntry()"

        >

            Nova entrada

        </BaseButton>

    </div>

    <EntryTable

        v-if="store.selected"

    />

    <template #footer>

        <BaseButton

            variant="secondary"

            @click="store.close()"

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

import FunForm from "./FunForm.vue";
import EntryTable from "./EntryTable.vue";

import { useFunStore } from "../../stores/funStore";

const store = useFunStore();

const form = ref();

function save(){

    form.value.validate();

}

</script>
