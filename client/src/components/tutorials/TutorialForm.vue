<template>

<div class="form-container">

    <BaseInput
        label="Título"
        v-model="form.title"
    />

    <BaseInput
        label="Categoria"
        v-model="form.category"
    />

    <BaseSelect
        label="Tipo"
        v-model="form.type"
        :options="typeOptions"
    />

    <BaseInput
        v-if="form.type==='video'"
        label="URL do vídeo"
        placeholder="https://youtube.com/..."
        v-model="form.content"
    />

    <div
        v-if="form.type==='text'"
        class="form-group"
    >

        <BaseMarkdownEditor

            v-if="form.type==='text'"

            label="Conteúdo"

            v-model="form.content"

        />

    </div>

    <BaseInput
        v-if="form.type==='image'"
        label="URL da imagem"
        v-model="form.content"
    />

    <BaseInput
        label="Ordem"
        type="number"
        v-model.number="form.sort_order"
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
import BaseMarkdownEditor from "../base/BaseMarkdownEditor.vue";

const props = defineProps({

    modelValue:Object,

    mode:String

});

const emit = defineEmits([

    "save"

]);

const form = reactive({

    id:null,

    title:"",

    category:"",

    description:"",

    type:"video",

    content:"",

    sort_order:0,

    active:1

});

watch(

    ()=>props.modelValue,

    value=>{

        Object.assign(form,{

            id:null,

            title:"",

            category:"",

            description:"",

            type:"video",

            content:"",

            sort_order:0,

            active:1,

            ...(value||{})

        });

    },

    {

        immediate:true

    }

);

function validate(){

    if(!form.title.trim()){

        return alert("Informe o título.");

    }

    if(!form.content.trim()){

        return alert("Informe o conteúdo.");

    }

    emit("save",{

        ...form,

        active:Number(form.active)

    });

}

defineExpose({

    validate

});

const typeOptions=[

    {

        value:"video",

        label:"Vídeo"

    },

    {

        value:"text",

        label:"Texto"

    },

    {

        value:"image",

        label:"Imagem"

    }

];

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