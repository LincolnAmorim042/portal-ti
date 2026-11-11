<template>

<div class="form-container">

    <template v-if="store.selected?.type==='text'">

        <BaseMarkdownEditor

            label="Texto"

            v-model="form.text"

        />

    </template>

    <template v-else>

        <div class="form-group">

            <label>

                Arquivo

            </label>

            <input

                ref="input"

                type="file"

                :accept="accept"

                @change="upload"

            >

        </div>

        <div

            v-if="form.file"

            class="preview"

        >

            <img

                v-if="store.selected.type==='image'"

                :src="form.file"

            >

            <audio

                v-else

                controls

                :src="form.file"

            />

        </div>

    </template>

    <BaseInput

        label="Ordem"

        type="number"

        v-model.number="form.sort_order"

    />

</div>

</template>

<script setup>

import {

    reactive,
    watch,
    computed

} from "vue";

import BaseInput from "../base/BaseInput.vue";
import BaseMarkdownEditor from "../base/BaseMarkdownEditor.vue";

import { useFunStore } from "../../stores/funStore";

const store = useFunStore();

const props = defineProps({

    modelValue:Object

});

const form = reactive({

    id:null,

    text:"",

    file:"",

    sort_order:0

});

watch(

    ()=>props.modelValue,

    value=>{

        Object.assign(

            form,

            {

                id:null,

                text:"",

                file:"",

                sort_order:0,

                ...(value||{})

            }

        );

    },

    {

        immediate:true

    }

);

const accept = computed(()=>{

    return store.selected?.type==="image"

        ? "image/*"

        : "audio/*";

});

async function upload(event){

    const file = event.target.files[0];

    if(!file)
        return;

    form.file = await store.upload(file);

}

async function validate(){

    if(store.selected.type==="text"){

        if(!form.text.trim()){

            alert("Informe o texto.");

            return;

        }

    }

    else{

        if(!form.file){

            alert("Selecione um arquivo.");

            return;

        }

    }

    await store.saveEntry({

        ...form

    });

}

defineExpose({

    validate

});

</script>
