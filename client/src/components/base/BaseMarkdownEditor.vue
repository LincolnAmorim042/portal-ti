<template>

<div class="markdown-editor">

    <label
        v-if="label"
        class="editor-label"
    >
        {{ label }}
    </label>

    <div class="editor-toolbar">

        <button
            type="button"
            @click="wrap('**','**')"
            title="Negrito"
        >
            <i class="bi bi-type-bold"></i>
        </button>

        <button
            type="button"
            @click="wrap('*','*')"
            title="Itálico"
        >
            <i class="bi bi-type-italic"></i>
        </button>

        <button
            type="button"
            @click="prefix('# ')"
            title="Título 1"
        >
            <i class="bi bi-type-h1"></i>
        </button>

        <button
            type="button"
            @click="prefix('## ')"
            title="Título 2"
        >
            <i class="bi bi-type-h2"></i>
        </button>

        <button
            type="button"
            @click="prefix('### ')"
            title="Título 3"
        >
            <i class="bi bi-type-h3"></i>
        </button>

        <button
            type="button"
            @click="prefix('- ')"
            title="Lista"
        >
            <i class="bi bi-list-ul"></i>
        </button>

        <button
            type="button"
            @click="prefix('1. ')"
            title="Lista numerada"
        >
            <i class="bi bi-list-ol"></i>
        </button>

        <button
            type="button"
            @click="prefix('> ')"
            title="Citação"
        >
            <i class="bi bi-blockquote-left"></i>
        </button>

        <button
            type="button"
            @click="insert('---')"
            title="Linha"
        >
            <i class="bi bi-dash-lg"></i>
        </button>

        <button
            type="button"
            @click="insert('[Texto](https://)')"
            title="Link"
        >
            <i class="bi bi-link-45deg"></i>
        </button>

        <button
            type="button"
            @click="insertCode"
            title="Código"
        >
            <i class="bi bi-code-slash"></i>
        </button>
        
        <button
            type="button"
            @click="chooseImage"
            title="Inserir imagem"
        >
            <i class="bi bi-image"></i>
        </button>

    </div>

    <textarea

        ref="textarea"

        class="editor"

        :rows="rows"

        :value="modelValue"

        @input="$emit('update:modelValue',$event.target.value)"

    />
    <input

        ref="imageInput"

        type="file"

        accept="image/*"

        style="display:none"

        @change="uploadImage"

    />

</div>

</template>

<script setup>

import { ref } from "vue";
import funService from "../../services/funService";

defineEmits([
    "update:modelValue"
]);

const props = defineProps({

    modelValue:{
        type:String,
        default:""
    },

    rows:{
        type:Number,
        default:12
    },

    label:String

});

const textarea = ref();
const imageInput = ref();

function update(value){

    textarea.value.value = value;

    textarea.value.dispatchEvent(
        new Event("input")
    );

    textarea.value.focus();

}

function wrap(before,after){

    const el = textarea.value;

    const start = el.selectionStart;
    const end = el.selectionEnd;

    const value = props.modelValue;

    const selected =
        value.substring(start,end);

    const result =
        value.substring(0,start)
        + before
        + selected
        + after
        + value.substring(end);

    update(result);

}

function prefix(prefix){

    const el = textarea.value;

    const start = el.selectionStart;

    const value = props.modelValue;

    const result =
        value.substring(0,start)
        + prefix
        + value.substring(start);

    update(result);

}

function insert(text){

    const el = textarea.value;

    const start = el.selectionStart;
    const end = el.selectionEnd;

    const value = props.modelValue;

    const result =
        value.substring(0,start)
        + text
        + value.substring(end);

    update(result);

    requestAnimationFrame(()=>{

        const position = start + text.length;

        el.selectionStart = position;
        el.selectionEnd = position;

    });

}

function insertCode() {
    insert("\n```bash\nCódigo\n```\n");
}

function chooseImage(){

    imageInput.value.value = "";

    imageInput.value.click();

}

async function uploadImage(event){

    const file = event.target.files?.[0];

    if(!file)
        return;

    try{

        const path = await funService.upload(file);

        insert(`\n\n![](${path})\n\n`);

    }

    catch(err){

        console.error(err);

        alert("Não foi possível enviar a imagem.");

    }

}

</script>