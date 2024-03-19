<template>
  <div id="app">
    <me-header></me-header>
    <router-view />
  </div>
</template>

<script>
import MeHeader from "@/components/common/MeHeader";

export default {
  name: "App",
  components: {
    MeHeader,
  },
};
</script>

<style lang="scss">
@import "./style/reset.css";
@import "./style/app.scss";
</style>
