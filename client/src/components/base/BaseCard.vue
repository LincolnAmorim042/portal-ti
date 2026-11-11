<template>

<div class="base-card">

    <header
        v-if="title"
        class="base-card-header">

        <h2>{{ title }}</h2>

        <slot name="actions"/>

    </header>

    <div class="base-card-body">

        <slot/>

    </div>

</div>

</template>

<script setup>

defineProps({

    title:String

})

</script>