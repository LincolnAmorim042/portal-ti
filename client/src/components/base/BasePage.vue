<template>

<div class="base-page">

    <header class="page-header">

        <div class="page-title">

            <h1>

                <i

                    v-if="icon"

                    :class="icon">

                </i>

                {{ title }}

            </h1>

            <p

                v-if="description">

                {{ description }}

            </p>

        </div>

    </header>

    <BaseToolbar>

        <template #left>

            <slot name="filters"/>

        </template>

        <template #right>

            <slot name="actions"/>

        </template>

    </BaseToolbar>

    <div class="page-content">

        <BaseLoader

            v-if="loading"

            :show="true"

        />

        <div

            v-else-if="empty"

            class="page-empty">

            <i class="bi bi-inbox"></i>

            <p>

                {{ emptyMessage }}

            </p>

        </div>

        <template v-else>

            <slot/>

        </template>

    </div>

</div>

</template>

<script setup>

import BaseLoader from "./BaseLoader.vue";
import BaseToolbar from "./BaseToolbar.vue";

defineEmits([
    "previous",
    "next"
]);

defineProps({

    title:String,

    description:String,

    icon:String,

    loading:Boolean,

    empty:Boolean,

    emptyMessage:{
        type:String,
        default:"Nenhum registro encontrado."
    },

});

</script>

