<template>
  <header>
    <router-link :to="{ path: '/' }">
      <div class="logo" style="logoTheme">
        <span class="blind">Mevie</span>
      </div>
    </router-link>
    <router-link v-if="$route.name !== 'search'" :to="{ name: 'search' }">
      <i class="material-symbols-outlined search" :style="{ left: `${1600 * scale}px` }"> search </i>
    </router-link>
  </header>
</template>

<script>
export default {
  name: "MeHeader",
  data() {
    return {
      scale: 0,
    };
  },
  computed: {},
  methods: {
    resize() {
      this.scale = window.innerWidth / 1920;
      console.log(this.scale);
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.resize);
      this.resize(); // 요소에 접근하기 전에 호출
    });
  },
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
    top: 10px;
  }
}
</style>
