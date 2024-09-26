<template>
    <div class="container">
        <label class="label" :for="inputName">Name</label>
        <!-- <input :id="inputName" :name="inputName" ref="input" :value="inputValue" @input="handleChangeInput" v-focus/> -->
        <input class="input" :id="inputName" :name="inputName" ref="inputRef" :value="inputValue" @input="handleChangeInput" v-focus/>
    </div>
</template>

<script setup>
import { toRefs, ref, reactive } from 'vue';

    //Simple Custom Directives
    const vFocus = {
        mounted: (el) => el.focus()
    }
    const props = defineProps(['inputValue', 'inputName'])
    const { inputValue, inputName } = toRefs(props)
    // const inputRef = reactive({input: null})
    // const { input } = toRefs(inputRef)
    const inputRef = ref(null)
    const emit = defineEmits(['change-input'])

    function handleChangeInput () {
        // emit('change-input', input.value.value)
        emit('change-input', inputRef.value.value)
    }
</script>

<style scoped>
@import '../../scss/input.scss';
</style>