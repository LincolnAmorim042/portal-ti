<template>

<div class="form-container">

    <BaseInput

        label="Título"

        v-model="form.title"

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

    <BaseSelect

        label="Tipo"

        v-model="form.type"

        :options="types"

    />

    <BaseInput

        label="Ordem"

        type="number"

        v-model.number="form.sort_order"

    />

    <BaseSelect

        label="Status"

        v-model="form.active"

        :options="status"

    />

</div>

</template>

<script setup>

import {

    reactive,

    watch

} from "vue";

import BaseInput from "../base/BaseInput.vue";
import BaseSelect from "../base/BaseSelect.vue";

import { useFunStore } from "../../stores/funStore";

const store = useFunStore();

const props = defineProps({

    modelValue:Object

});

const form = reactive({

    id:null,

    title:"",

    icon:"",

    description:"",

    type:"text",

    sort_order:0,

    active:1

});

watch(

    ()=>props.modelValue,

    value=>{

        Object.assign(

            form,

            {

                id:null,

                title:"",

                icon:"",

                description:"",

                type:"text",

                sort_order:0,

                active:1,

                ...(value||{})

            }

        );

    },

    {

        immediate:true

    }

);

function validate(){

    if(!form.title.trim()){

        return alert(

            "Informe o título."

        );

    }

    store.save({

        ...form,

        active:Number(form.active)

    });

}

defineExpose({

    validate

});

const types=[

    {

        value:"text",

        label:"Texto"

    },

    {

        value:"image",

        label:"Imagem"

    },

    {

        value:"audio",

        label:"Áudio"

    }

];

const status=[

    {

        value:1,

        label:"Ativo"

    },

    {

        value:0,

        label:"Inativo"

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