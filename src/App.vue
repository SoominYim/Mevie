<template>
  <div id="app">
    <me-header></me-header>
    <router-view />
    <me-fix></me-fix>
  </div>
</template>

<script>
import MeHeader from "@/components/common/MeHeader";
import MeFix from "@/components/common/MeFix";

export default {
  name: "App",
  components: {
    MeHeader,
    MeFix,
  },
  data() {
    return {
      localTheme: localStorage.getItem("theme"),
    };
  },
  created() {
    this.localTheme = localStorage.getItem("theme");
    if (this.localTheme) {
      document.documentElement.setAttribute("data-theme", this.localTheme);
      this.$store.commit("setTheme", this.localTheme);
    } else {
      document.documentElement.setAttribute("data-theme", this.$store.state.theme);
      window.localStorage.setItem("theme", this.$store.state.theme);
    }
  },
};
</script>

<style lang="scss">
@import "./style/common/reset.css";
@import "./style/common/app.scss";
@import "./style/common/fonts.css";
</style>
