<template>

<div class="form-container">

    <BaseInput

        label="Usuário"

        v-model="form.username"

    />

    <BaseInput

        label="Senha"

        type="password"

        v-model="form.password"

    />

    <BaseInput

        label="Confirmar senha"

        type="password"

        v-model="confirmPassword"

    />

    <BaseSelect

        label="Status"

        v-model="form.active"

        :options="statusOptions"

    />

</div>

</template>

<script setup>

import { reactive, ref, watch } from "vue";

import BaseInput from "../base/BaseInput.vue";
import BaseSelect from "../base/BaseSelect.vue";

const props=defineProps({

    modelValue:Object,

    mode:String

});

const emit=defineEmits([

    "save"

]);

const form=reactive({

    id:null,

    username:"",

    password:"",

    active:1

});

const confirmPassword=ref("");

watch(

    () => props.modelValue,

    value => {

        Object.assign(form, {

            id: null,

            username: "",

            password: "",

            active: 1,

            ...(value || {})

        });

        confirmPassword.value = "";

    },

    {

        immediate: true

    }

);

function validate(){

    if(!form.username){

        return alert("Informe o usuário");

    }

    if(props.mode==="create"){

        if(form.password.length<4){

            return alert("Senha muito curta");

        }

    }

    if(form.password!==confirmPassword.value){

        return alert("As senhas são diferentes");

    }

    emit("save",{...form});

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

</script>