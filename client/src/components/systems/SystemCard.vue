<template>

<div class="system-card">

    <div class="system-icon">

        <i :class="system.icon || 'bi bi-grid'" />

    </div>

    <div class="system-body">

        <h3>

            {{ system.name }}

        </h3>

        <p>

            {{ system.description || "Sem descrição." }}

        </p>

    </div>

    <BaseButton @click="open">

        Abrir

    </BaseButton>

</div>

</template>

<script setup>

import BaseButton from "../base/BaseButton.vue";
import systemService from "../../services/systemService";

const props = defineProps({

    system:Object

});

async function open(){

    try{

        await systemService.launch(

            props.system.id

        );

    }

    catch(err){

        console.error(err);

        alert("Não foi possível abrir a ferramenta.");

    }

}

</script>