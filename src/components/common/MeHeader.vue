<template>
  <header>
    <div class="logo" :style="logoTheme">
      <router-link :to="{ name: 'main' }">
        <span class="blind">Mevie</span>
      </router-link>
    </div>
    <span class="button__page-back">
      <a @click="$router.go(-1)">
        <i class="fas fa-chevron-left">
          <span class="blind">이전 페이지</span>
        </i>
      </a>
    </span>
    <span class="button__search">
      <!-- <router-link :to="{ name: 'search' }">
        <i class="fas fa-search"></i>
      </router-link> -->
    </span>
  </header>
</template>

<script>
export default {
  name: "MeHeader",
  data() {
    return {};
  },
  computed: {
    logoTheme() {
      const theme = this.$store.state.theme;
      return {
        background: `url(${
          theme === "brightMode" ? require("@/assets/logo_white.png") : require("@/assets/logo_black.png")
        }) no-repeat 0 0 / 100% auto`,
      };
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
header {
  padding: 20px 0;
  * {
    position: relative;
  }
  .logo {
    left: calc(50% - 200px / 2);
  }
}
</style>
