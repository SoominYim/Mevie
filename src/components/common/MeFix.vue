<template>
  <div class="fix-item">
    <button class="top-btn" @click="scrollTop">
      <span class="material-symbols-outlined" :style="{ left: `${isIOS && isMobile ? -3 : 0}px` }"> arrow_upward </span>
    </button>
    <button class="mode-btn" @click="toggleMode">
      <span class="material-symbols-outlined" :style="{ left: `${isIOS && isMobile ? -3 : 0}px` }">
        {{ theme == "brightMode" ? "light_mode" : "dark_mode" }}
      </span>
    </button>
  </div>
</template>

<script>
import MobileDetect from "mobile-detect";
export default {
  name: "MeFix",
  computed: {
    theme() {
      return this.$store.state.theme;
    },
    isMobile() {
      const md = new MobileDetect(window.navigator.userAgent);
      return md.mobile() !== null;
    },
    isIOS() {
      const userAgent = window.navigator.userAgent;
      return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toggleMode() {
      const newTheme = this.theme == "darkMode" ? "brightMode" : "darkMode";
      this.$store.commit("setTheme", newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    },
    scrollTop() {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss" scoped>
// Fixed
.fix-item {
  position: fixed;
  z-index: 999;
  right: 5%;
  bottom: 5%;
  button {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #b0b1b3;
    vertical-align: top;
    span {
      left: 0px;
      position: relative;
      padding: 3px 0 0 0;
    }
    cursor: pointer;
  }
  .mode-btn {
    margin-left: 15px;
  }
}
</style>
