<script setup>
import Header from "./components/Layout/Header.vue";
import Footer from "./components/Layout/Footer.vue";
</script>

<template>
  <Header></Header>
  <main class="mt-20 max-w-[1400px] mx-auto">
    <RouterView></RouterView>
  </main>
  <!-- <Footer></Footer> -->
</template>
