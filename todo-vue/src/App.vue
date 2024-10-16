<script setup>
import { onMounted } from "vue";
import Header from "./components/Layout/Header.vue";
// import Footer from "./components/Layout/Footer.vue";

onMounted(() => {
  console.log(import.meta.env.NODE_ENV);
  console.log(import.meta.env.VITE_APP_WELCOME);
  console.log("Environment Variables:", import.meta.env);
  alert(import.meta.env.VITE_APP_WELCOME);
});
</script>

<template>
  <Header></Header>
  <main class="mt-20 max-w-[1400px] mx-auto">
    <RouterView></RouterView>
  </main>
  <!-- <Footer></Footer> -->
</template>
