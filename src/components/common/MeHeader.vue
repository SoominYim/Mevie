<template>
  <header>
    <router-link :to="{ path: '/' }">
      <div class="logo" style="logoTheme">
        <span class="blind">Mevie</span>
      </div>
    </router-link>
    <router-link v-if="$route.name !== 'search'" :to="{ name: 'search' }">
      <i class="material-symbols-outlined search"> search </i>
    </router-link>
  </header>
</template>

<script>
export default {
  name: "MeHeader",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
header {
  position: relative;
  * {
    position: absolute;
    z-index: 100;
  }
  .logo {
    width: calc(70px / 1.271);
    height: 70px;
    left: 10px;
    top: 10px;
    background: url("../../assets/logo_black.png") no-repeat 0 0 / 100% auto;
  }
  .search {
    color: white;
    font-weight: bold;
    font-size: 4.9rem;
    left: 1090px;
    top: 20px;
  }
}
</style>
