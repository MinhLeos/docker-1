<template>
    <div class="footer">
        <p class="footer-all">Total: {{ todos.length }}</p>
        <!-- <p class="footer-all">Total: {{ todoLength.length }}</p> -->
        <p class="footer-done">Done: {{ todos.doneLength }}</p>
    </div>
</template>

<script>
    import { store } from '../../composables/store.js';
    export default {
        computed: {
            todos(){
                const { TODOS_LIST } = store()
                return this.$todoLength(TODOS_LIST)
            }
        }
    }
</script>
<style lang="scss" scoped>
@import '../../scss/footer.scss';
</style>
