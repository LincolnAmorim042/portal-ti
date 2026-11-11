<template>

<Teleport to="body">

<div

    v-if="modelValue"

    class="modal-overlay"

    @click.self="$emit('update:modelValue',false)">

    <div class="modal-window">

        <header class="modal-header">

            <h2>

                {{ title }}

            </h2>

            <button

                class="close"

                @click="$emit('update:modelValue',false)">

                <i class="bi bi-x-lg"></i>

            </button>

        </header>

        <section class="modal-body">

            <slot/>

        </section>

        <footer
            v-if="$slots.footer"
            class="modal-footer">

            <slot name="footer"/>

        </footer>

    </div>

</div>

</Teleport>

</template>

<script setup>

defineEmits([

    "update:modelValue"

]);

defineProps({

    modelValue:Boolean,

    title:String

});

</script>

