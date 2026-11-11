<template>

<div class="base-input-group">

    <label
        v-if="label">

        {{ label }}

    </label>

    <input

        :type="type"

        :placeholder="placeholder"

        :value="modelValue"

        @input="$emit('update:modelValue',$event.target.value)"

        class="base-input"

    >

</div>

</template>

<script setup>

defineEmits([
    "update:modelValue"
]);

defineProps({

    label:String,

    placeholder:String,

    modelValue:String,

    type:{
        type:String,
        default:"text"
    }

});

</script>