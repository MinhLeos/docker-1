<template>
    <div class="header" id="header" ref="headerRef">
        <div class="header-logo">
            <img src="../../assets/vue.svg" alt="Vue logo" />
        </div>
        <nav class="header-nav">
            <RouterLink v-for="data in navbarData" :to="data.path">{{ data.title }}</RouterLink>
        </nav>
    </div>
</template>

<script setup>
    import navbarData from '../../ultis/navbar.js';
</script>

<style lang="scss" scoped>
@import '../../scss/header.scss';
</style>