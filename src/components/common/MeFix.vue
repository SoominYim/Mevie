<template>
  <div class="fix-item">
    <button class="top-btn" @click="scrollTop"><span class="material-symbols-outlined"> arrow_upward </span></button>
    <button class="mode-btn" @click="toggleMode">
      <span class="material-symbols-outlined">
        {{ theme == "blightMode" ? "light_mode" : "dark_mode" }}
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "MeFix",
  computed: {
    theme() {
      return this.$store.state.theme;
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
      padding: 3px 0 0 0;
    }
    cursor: pointer;
  }
  .mode-btn {
    margin-left: 15px;
  }
}
</style>
