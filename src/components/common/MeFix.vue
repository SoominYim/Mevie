<template>
  <div class="fix-item">
    <button class="top-btn"><span class="material-symbols-outlined"> arrow_upward </span></button>
    <button class="mode-btn" @click="toggleMode">
      <span class="material-symbols-outlined">
        {{ theme == "blightMode" ? "light_mode" : "dark_mode" }}
      </span>
    </button>
  </div>
</template>

<script>
// import MainMovie from "@/components/main/MainMovie";
export default {
  name: "MeFix",
  data() {
    return {
      theme: "blightMode",
    };
  },
  mounted() {
    let localTheme = localStorage.getItem("theme");
    if (localTheme) {
      document.documentElement.setAttribute("data-theme", localTheme);
      this.theme = localTheme;
    } else {
      document.documentElement.setAttribute("data-theme", this.theme);
      window.localStorage.setItem("theme", this.theme);
    }
  },
  methods: {
    toggleMode() {
      this.theme = this.theme == "darkMode" ? "blightMode" : "darkMode";
      localStorage.setItem("theme", this.theme);
      document.documentElement.setAttribute("data-theme", this.theme);
    },
  },
};
</script>

<style lang="scss" scoped></style>
