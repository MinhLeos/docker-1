<template>
    <Teleport to="body">
        <div @click="handleClickClose" class="dialog-div" v-if="props.open"></div>
        <Transition name="dialog">
            <dialog open class="dialog-dialog" v-if="props.open">
                <header class="dialog-header">
                    <slot name="header">
                        <h2>{{ props.title }}</h2>
                    </slot>
                </header>
                <section class="dialog-section">
                    <slot></slot>
                </section>
                <menu class="dialog-menu">
                    <slot name="actions">
                        <Button @click="handleClickClose"></Button>
                    </slot>
                </menu>
            </dialog>
        </Transition>
    </Teleport>
</template>

<script setup>
import Button from './Button.vue';

const props = defineProps(['title', 'open'])
const emit = defineEmits(['close'])

function handleClickClose() {
    emit('close')
}
</script>

<style lang="scss" scoped>
@import '../../scss/dialog.scss';
</style>