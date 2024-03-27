<template>
  <section class="sec__movie">
    <h2>영화 소개</h2>
    <div class="movie__box">
      <div class="box__poster">
        <img :src="movieData.poster_path" alt="포스터" v-if="movieData.poster_path !== null" />
        <img src="../../assets/img_no_poster.png" alt="No-Data" v-if="movieData.poster_path === null" />
      </div>
      <div
        class="box__txt"
        :style="{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          top: `${top}px`,
          left: `${left}px`,
        }"
      >
        <h3 class="txt__title">{{ movieData.title }}</h3>
        <dl class="txt__desc">
          <dd class="blind">원작이름</dd>
          <dt class="desc1">{{ movieData.original_title }}</dt>

          <dd class="blind">장르, 개봉일, 상영시간, 평점</dd>
          <dt class="desc2">
            <span class="txt__genres">{{ movieGenres }}</span>
            <span class="txt__release-date"> {{ movieData.release_date }} &nbsp;</span>
            <span class="txt__runtime"> {{ movieData.runtime }}분 </span>
            <span class="txt__vote-avg"> 💛 {{ movieData.vote_average }}/10</span>
          </dt>
        </dl>
        <strong class="txt__tagline">{{ movieData.tagline }}</strong>
        <p class="txt__overview">{{ movieData.overview }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "DeMovies",
  props: ["movieData", "movieGenres"],
  data() {
    return {
      scale: 0,
      top: 170,
      left: 0,
    };
  },
  methods: {
    handleResize() {
      const w_width = window.innerWidth;
      const scale = w_width / 1920;

      this.scale = scale;
      this.left = 600 * scale;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
    });
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/detail/movie.scss";
</style>
