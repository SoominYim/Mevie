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
      localTheme: localStorage.getItem("theme") || "brightMode",
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
  created() {
    this.localTheme = localStorage.getItem("theme");
    if (this.localTheme) {
      document.documentElement.setAttribute("data-theme", this.localTheme);
      this.$store.commit("setTheme", this.localTheme);
    } else {
      document.documentElement.setAttribute("data-theme", this.theme);
      window.localStorage.setItem("theme", "brightMode");
    }
  },
};
</script>

<style lang="scss">
@import "./style/reset.css";
@import "./style/app.scss";
</style>
