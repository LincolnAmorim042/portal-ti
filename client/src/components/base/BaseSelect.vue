<template>

<div class="base-select-group">

    <label
        v-if="label">

        {{ label }}

    </label>

    <select

        class="base-selector"

        :value="modelValue"

        @change="$emit('update:modelValue',$event.target.value)">

        <option

            v-for="option in options"

            :key="option.value"

            :value="option.value">

            {{ option.label }}

        </option>

    </select>

</div>

</template>

<script setup>

defineEmits([
    "update:modelValue"
]);

defineProps({

    label:String,

    modelValue:String,

    options:{
        type:Array,
        default:()=>[]
    }

});

</script>