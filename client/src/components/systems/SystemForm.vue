<template>

<div class="form-container">

    <BaseInput
        label="Nome"
        v-model="form.name"
    />

    <BaseInput
        label="URL"
        v-model="form.url"
    />

    <BaseInput
        label="Categoria"
        v-model="form.category"
    />

    <div class="icon-input-group">
        <BaseInput

            label="Ícone"

            placeholder="bi bi-cloud"

            v-model="form.icon"

        />

        <button
            type="button"
            class="icon-help-button"
            title="Abrir biblioteca de ícones"
            @click="openBootstrapIcons"
        >
            <i class="bi bi-search"></i>
        </button>
    </div>

    <BaseInput
        label="Descrição"
        v-model="form.description"
    />

    <BaseInput
        label="Ordem"
        type="number"
        v-model.number="form.sort_order"
    />

    <BaseSelect
        label="Modo de abertura"
        v-model="form.launch_mode"
        :options="launchModes"
    />

    <BaseSelect
        label="Status"
        v-model="form.active"
        :options="statusOptions"
    />

</div>

</template>

<script setup>

import { reactive, watch } from "vue";

import BaseInput from "../base/BaseInput.vue";
import BaseSelect from "../base/BaseSelect.vue";

const props = defineProps({

    modelValue:Object,

    mode:String

});

const emit = defineEmits([

    "save"

]);

const form = reactive({

    id:null,

    name:"",

    url:"",

    description:"",

    icon:"bi-grid",

    category:"",

    sort_order:0,

    active:1

});

watch(

    () => props.modelValue,

    value => {

        Object.assign(form, {

            id: null,

            name: "",

            url: "",

            description: "",

            icon: "bi-grid",

            category: "",

            sort_order: 0,

            active: 1,

            ...(value || {})

        });

    },

    {

        immediate: true

    }

);

function validate(){

    if(!form.name.trim()){

        return alert("Informe o nome.");

    }

    if(!form.url.trim()){

        return alert("Informe a URL.");

    }

    emit("save",{

        ...form,

        active:Number(form.active)

    });

}

defineExpose({

    validate

});

const statusOptions=[

    {

        value:1,

        label:"Ativo"

    },

    {

        value:0,

        label:"Inativo"

    }

];

const launchModes = [

    {
        value:"redirect",
        label:"Redirecionamento"
    },

    {
        value:"popup",
        label:"Popup"
    },

    {
        value:"portal-sso",
        label:"Protegido pelo Portal"
    }

];

const openBootstrapIcons = () => {
    window.open(
        'https://icons.getbootstrap.com/',
        '_blank',
        'noopener,noreferrer'
    )
}

</script>