<template>
  <section v-if="similarMovies.length !== 0">
    <h2>비슷한 영화</h2>
    <ul class="inner clearfix">
      <li :key="index" v-for="(item, index) in this.similarMovies">
        <router-link @click="getNewMovieId(item.id)" :to="{ path: `/detail/${item.id}` }">
          <div class="movie-img">
            <img :src="item.poster" alt="포스터" v-if="item.poster !== null" />
            <img src="../../assets/img_no_poster.png" alt="No-Data" v-if="item.poster === null" />
          </div>
        </router-link>
        <span class="movie-title">{{ item.title }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "SimilarMovies",
  props: ["similarMovies", "getNewMovieId"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/detail/similar.scss";
</style>
