<template>
  <div id="app">
    <me-main></me-main>
  </div>
</template>

<script>
import MeMain from "@/views/MeMain.vue";

export default {
  name: "App",
  components: {
    MeMain,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
