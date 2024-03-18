<template>
  <div id="app">
    <mevie-main></mevie-main>
  </div>
</template>

<script>
import MevieMain from "@/components/MevieMain.vue";

export default {
  name: "App",
  components: {
    MevieMain,
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
