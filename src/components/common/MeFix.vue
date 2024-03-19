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
      console.log(this.theme);
    },
    scrollTop() {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
