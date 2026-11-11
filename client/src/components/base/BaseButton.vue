<template>

<button

    class="base-button"

    :class="variant"

    :disabled="disabled"

    @click="$emit('click',$event)">

    <i

        v-if="icon"

        :class="icon">

    </i>

    <slot/>

</button>

</template>

<script setup>

defineEmits([

    "click"

]);

defineProps({

    variant:{

        type:String,

        default:"primary"

    },

    icon:String,

    disabled:Boolean

});

</script>