<template>

<BaseModal

    v-model="store.modal"

    :title="title"

>

    <TutorialForm

        ref="form"

        :mode="store.mode"

        :model-value="store.selected"

        @save="save"

    />

    <template #footer>

        <BaseButton

            variant="secondary"

            @click="store.closeModal()"

        >

            Cancelar

        </BaseButton>

        <BaseButton

            @click="form.validate()"

        >

            Salvar

        </BaseButton>

    </template>

</BaseModal>

</template>

<script setup>

import { computed, ref } from "vue";

import BaseModal from "../base/BaseModal.vue";
import BaseButton from "../base/BaseButton.vue";

import TutorialForm from "./TutorialForm.vue";

import { useTutorialStore } from "../../stores/tutorialStore";

const store=useTutorialStore();

const form=ref();

const title=computed(()=>{

    return store.mode==="create"

        ? "Novo tutorial"

        : "Editar tutorial";

});

async function save(data){

    if(store.mode==="create"){

        await store.create(data);

    }

    else{

        await store.update(

            data.id,

            data

        );

    }

    store.closeModal();

}

</script>